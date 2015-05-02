/**
 * ResultController
 *
 * @description :: Server-side logic for managing results
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {

	    var params = req.params.all();

	    res.json(params);

	    /*Result.create(params, function(err, sleep) {

	        if (err) return next(err);

	        res.status(201);

	        res.redirect('/map');

	    });*/
	}
};

