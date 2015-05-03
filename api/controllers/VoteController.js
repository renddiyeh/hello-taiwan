/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {

	    var list = req.param('q1');

	    var result = req.allParams();
	    delete result.q1;

	    Voter.create(result).exec(function (err, newVoter) {
	    	for (var i = list.length - 1; i >= 0; i--) {
		    	if (list[i] != "") {
		    		List.findOrCreate({ name: list[i] }, { name: list[i] }).exec(function (err, newList) {
			    		Vote.create({ voter: newVoter.id, food: newList.id });
			    	});
		    	}
		    };
	    });

	    res.redirect('/map');
	    //res.json(result);

	    /*Result.create(params, function(err, sleep) {

	        if (err) return next(err);

	        res.status(201);

	        res.redirect('/map');

	    });*/
	}
};

