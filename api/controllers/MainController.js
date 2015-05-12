/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res) {
		var list = req.param('list');
		if(list)
			var food = List.findOne({id: list}).exec(function (err, found) {
				res.view('index', {food: found.name})
			})
		else res.view('index', {food: ''})
	},
	result: function (req, res) {
		var lead = List.find().populate('votes').exec(function (err, lists) {
			async.sortBy(lists, function (x, callback) {
			    callback(null, x.votes.length*-1);
			}, function (err, result) {
			    res.view('result', {lead: result[0].name})
			});
		})
	}
};

