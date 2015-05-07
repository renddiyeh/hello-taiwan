/**
 * ResultController
 *
 * @description :: Server-side logic for managing results
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
    
	    City.find()
        .populate('voter')
        .exec(function (err, data) {

            if (err) return next(err);

            res.view('result', {
                data: data
            });

        });

	}
};

