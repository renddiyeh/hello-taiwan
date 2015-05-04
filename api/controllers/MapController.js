/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
    
	    City.find(function(err, data) {

        	if (err) return next(err);

        	res.view('map', {
        		data: data
        	});

	    });

	}
};

