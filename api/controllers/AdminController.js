/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	voteControl: function(req, res) {
		List.find().populate('votes').exec(function (e, list) {
			var ranked = list
				.sort(function(a, b) { return b.votes.length - a.votes.length })
				.filter(function(x) { return x.votes.length > 0 });
			res.view('voteControl', {
				list: ranked
			})
		})
	},
	voteJoin: function(req, res) {
		var params = req.body;
		Vote.update({food: params.subordinate}, {food: params.dominant, originFood: params.subordinate}).exec(function (e, updated) {
			res.redirect('/vote/control')
		})
	},
};

