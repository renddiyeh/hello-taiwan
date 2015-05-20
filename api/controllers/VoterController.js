/**
 * VoterController
 *
 * @description :: Server-side logic for managing voters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	summary: function (req, res) {
		Voter.find().populate('q1_1').exec(function(err, found) {
			var result = [0,0,0,0,0];
			async.each(found, function(voter, callback) {
				var l = voter['q1_1'].length;
				result[l-1] += 1;
				callback();
			}, function(err) {
				res.json(result)
			})
		})
	}
};

