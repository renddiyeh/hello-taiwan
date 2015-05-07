/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	votes: function(req, res) {
      var toCountArray = function (obj) {
        var arr = [];
        for (var key in obj) {
          arr.push({id: key, count: obj[key]});
        }
        return arr;
      };

      var sortAndPrint = function (counts) {
        counts.sort(function(a, b) { return b.count - a.count });
        async.map(counts, function (food, cb) {
          List.findOne({id : food.id}).exec(function (e, r) {
            if(e) console.log(e);
            cb('', {food: r.name, count: food.count});
          });
        }, function (err, results) {
          if(err) console.log(err);
          res.json(results);
        });
        
      };      

      var cityId = req.params.id;
      City.findOne({ id: cityId }).populate('voter').exec(function (e, city) {
      	if(e) console.log(e);
      	// 確認該城市有人投過票
      	var voterList = city.voter;
	    if(voterList.length) {
	        // 開始票數統計
	        var counts = {};
	        var result;
	        async.each(voterList, function (voter, cb) { 
	        	Vote.find({voter: voter.id}).exec(function (e, r) {
	        		if(e) console.log(e);
	        		for (var i = r.length - 1; i >= 0; i--) {              
	            		counts[r[i].food] = (counts[r[i].food] + 1) || 1;            
	            	};            
	            	cb();
	          	});
	        }, function (err) {
	        	if(err) console.log(err);
	        	// 取得原始資料，因為async.js只吃array，先轉換成array
	        	var arr = toCountArray(counts);
	        	// 然後sort
	        	sortAndPrint(arr);
	        });
	    } else res.json([]);
      });
  	}
};

