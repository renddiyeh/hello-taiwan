/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	rank: function(req, res) {
		List.find({}).populate('votes').exec(function (e, list) {
			list.sort(function(a, b) { return b.votes.length - a.votes.length });
			res.json(list);
		})
	}
};

