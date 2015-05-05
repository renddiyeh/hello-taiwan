/**
* City.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: 'string',
  	voter: {
  		collection: 'voter',
  		via: 'city'
  	},
  	votes: function(){
      var voterList = this.voter;

      var toArray = function (obj) {
        var arr = [];
        for (var key in obj) {
          arr.push({id: key, count: obj[key]});
        }
        return arr;
      };

      var sortAndPrint = function (counts) {
        counts.sort(function(a, b) {return b.count - a.count})
        async.map(counts, function (food, cb) {
          console.log(food);
          List.find({id : food.id}).exec(function (e, r) {
            if(e) console.log(e);
            cb('', {food: r[0].name, count: food.count});
          });
        }, function (err, results) {
          if(err) console.log(err);
          console.log(results);
          return results;
          //return JSON.stringify(results);
        });         
        
      };
      // 確認該城市有人投過票
      if(voterList.length) {
        // 開始票數統計
        var counts = {};
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
          console.log(counts);
          // 取得原始資料，因為async，先轉換成array
          var arr = toArray(counts);
          // 然後sort
          console.log(arr);
          sortAndPrint(arr);
        });
      } else return '';
  	}
  }
};

