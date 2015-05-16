/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res) {

	    var result = req.allParams();
	    var voteList = uniq(result.q1_1);
	    delete result.q1_1;

		var voterId;

	    var afterVoteList = function (newList, callback) {
	    	Vote.create({ voter: voterId, food: newList.id }).exec(function (err, created) {
    			if(err) {
	    			console.log(err);	
	    			return res.serverError(err);
	    		}
	    		return callback();
	    	});
	    };

	    var insertVoter = function () {
	    	Voter.create(result).exec(function (err, newVoter) {
	    		if(err) console.log(err);
		    	voterId = newVoter.id;

		    	async.each(voteList, function (item, callback) {
		    		if (item != "") {
			    		List.findOrCreate({ name: item }, { name: item }).exec( function (err, converted) {
			    			if(err) {
				    			console.log(err);	
				    			return res.serverError(err);
				    		}
				    		afterVoteList(converted, callback);
			    		});
			    	} else callback();
		    	}, function(err) {
		    		if(err) console.log(err);
		    		return res.json('success');
		    	})

		    });
	    };

		var convert = function (name, callback) {
			var convertedArray = [];
			var uniqArray = uniq(result[name]);
			async.each(uniqArray, function (item, callback2) {
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
		   		return callback(null, 'converted');
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

	    function uniq(a) {
		    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

		    return a.filter(function(item) {
		        var type = typeof item;
		        if(type in prims)
		            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
		        else
		            return objs.indexOf(item) >= 0 ? false : objs.push(item);
		    });
		}
	},
	control: function(req, res) {
		List.find().populate('votes').exec(function (e, list) {
			var ranked = list
				.sort(function(a, b) { return b.votes.length - a.votes.length })
				.filter(function(x) { return x.votes.length > 0 });
			res.view('voteControl', {
				list: ranked
			})
		})
	},
	join: function(req, res) {
		var params = req.query;
		Vote.update({food: params.subordinate}, {food: params.dominant, originFood: params.subordinate}).exec(function (e, updated) {
			res.redirect('/vote/control')
		})
	},
	joinRec: function(req, res) {
		Vote.find({originFood: {'>': 0}}).populate('food').exec(function (e, found) {
			async.concat(found, function (vote, callback) {
				List.findOne({id: vote.originFood}).exec(function (err, food) {
					vote['originFood'] = food;
					callback(err, vote)
				})
			}, function(err, results){
				res.view('joinRec', {rec: results})
			})
		})
	}

};

