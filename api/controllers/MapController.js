/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
    
	    Result.find(function(err, data) {

        	if (err) return next(err);

        	var city = [
	            '台北市','基隆市','新北市','宜蘭縣','新竹縣','新竹市','桃園縣','苗栗縣',
           		'台中市','彰化縣','南投縣','嘉義縣','嘉義市','雲林縣','台南市','高雄市',
            	'澎湖縣','屏東縣','台東縣','花蓮縣','金門縣','連江縣'
	        ];

        	res.view('map', {
        		data: data
        	});

	    });

	}
};

