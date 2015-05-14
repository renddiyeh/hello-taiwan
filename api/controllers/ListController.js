/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	rank: function(req, res) {
		var page = req.query.page || 1;
		var limit = req.query.limit || 10;
		List.find().populate('votes').exec(function (e, list) {
			var ranked = list
					.sort(function(a, b) { return b.votes.length - a.votes.length })
					.filter(function(x) { return x.votes.length > 0 });

			res.json(ranked.slice((page-1)*limit, page*limit));
		})
	},
	count: function(req, res) {
		List.find().populate('votes').exec(function (e, list) {
			var ranked = list
					.filter(function(x) { return x.votes.length > 0 });
			res.json(ranked.length);
		})
	}
};

