/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {

	    var result = req.allParams();
	    var voteList = result.q1;
	    delete result.q1;

		var voterId;

	    var afterVoteList = function (err, newList) {
	    	if(err) console.log(err);
	    	Vote.create({ voter: voterId, food: newList.id }).exec(console.log);
	    };

	    var insertVoter = function () {
	    	Voter.create(result).exec(function (err, newVoter) {
	    		if(err) console.log(err);
		    	voterId = newVoter.id;

		    	console.log(newVoter);

		    	for (var i = voteList.length - 1; i >= 0; i--) {
			    	if (voteList[i] != "") {
			    		List.findOrCreate({ name: voteList[i] }, { name: voteList[i] }).exec(afterVoteList);
			    	}
			    }
		    });
	    };

		var convert = function (name, cb) {
			console.log("--start convert--");
			console.log(name);
			var convertedArray = [];
			async.each(result[name], function (item, callback2) {
				if (item != "") {
		    		List.findOrCreate({ name: item }, { name: item }).exec(function (err, converted) {
		    			console.log(converted);
		    			convertedArray.push(converted.id);
		    			callback2();
		    		});
		    	} else callback2();
			}, function(err) {
				// assign converted array back to result
		   		result[name] = convertedArray;
		   		console.log("--converted--");
		   		return cb(null, 'converted');
			});	
		};

/*		async.parallel({
		    q3: function (callback) {
				convert('q3', callback);
		    },
		    q4: function (callback) {
		        convert('q4', callback);
		    }
		}, function (err, results) {
		    // all food list converted
		    insertVoter();
		});	  */  
		insertVoter();

	    //res.redirect('/voter');
	    res.ok('ok');
	}

};

