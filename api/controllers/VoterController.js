/**
 * VoterController
 *
 * @description :: Server-side logic for managing voters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	summary: function (req, res) {
		Voter.find().populate('q1_1').exec(function(err, found) {
			var result = {
				q1_1: [0,0,0,0,0],
				q1_2: [0,0,0,0,0],
				q3_1: [0,0,0,0,0,0],
				q3_2: [0,0,0,0,0,0],
				duration: [0,0,0,0]
			};
			var vLength = found.length;
			async.each(found, function(voter, callback) {
				var q1_1 = voter['q1_1'].length;
				var q1_2 = voter['q1_2'].length;
				var q3_1 = voter['q3_1'].length;
				var q3_2 = voter['q3_2'].length;				
				result['q1_1'][q1_1-1] += 1;
				result['q1_2'][q1_2-1] += 1;
				result['q3_1'][q3_1] += 1;
				result['q3_2'][q3_2] += 1;

				var duration = voter.duration || [0,0,0,0];
				for (var i = duration.length - 1; i >= 0; i--) {
					result.duration[i] += duration[i]/vLength;
				};

				callback();
			}, function(err) {
				res.json(result)
			})
		})
	}
};

