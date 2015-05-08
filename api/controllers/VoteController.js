/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {

	    var result = req.allParams();
	    var voteList = result.q1_1;
	    delete result.q1_1;

		var voterId;

	    var afterVoteList = function (err, newList) {
	    	if(err) console.log(err);
	    	Vote.create({ voter: voterId, food: newList.id }).exec(function (err, created) {
    			if(err) {
	    			console.log(err);	
	    			return res.serverError(err);
	    		}
	    	});
	    };

	    var insertVoter = function () {
	    	Voter.create(result).exec(function (err, newVoter) {
	    		if(err) console.log(err);
		    	voterId = newVoter.id;

		    	for (var i = voteList.length - 1; i >= 0; i--) {
			    	if (voteList[i] != "") {
			    		List.findOrCreate({ name: voteList[i] }, { name: voteList[i] }).exec( function (err, converted) {
			    			if(err) {
				    			console.log(err);	
				    			return res.serverError(err);
				    		}
			    			afterVoteList();
			    		});
			    	}
			    }
		    });
	    };

		var convert = function (name, cb) {
			var convertedArray = [];
			async.each(result[name], function (item, callback2) {
				if (item != "") {
		    		List.findOrCreate({ name: item }, { name: item }).exec(function (err, converted) {
		    			if(err) {
		    				console.log(err);	
		    				return res.serverError(err);
		    			}
		    			convertedArray.push(converted.id);
		    			callback2();
		    		});
		    	} else callback2();
			}, function(err) {
				// assign converted array back to result
				if(err) console.log(err);
		   		result[name] = convertedArray;
		   		return cb(null, 'converted');
			});	
		};

		async.series({
			q1_2: function (callback) {
				convert('q1_2', callback);
		    },
		    q3_1: function (callback) {
				convert('q3_1', callback);
		    },
		    q3_2: function (callback) {
		        convert('q3_2', callback);
		    }
		}, function (err, results) {
		    // all food list converted
		    insertVoter();
		});	    
		insertVoter();

	    res.redirect('/result');
	    //res.ok('ok');
	}

};

