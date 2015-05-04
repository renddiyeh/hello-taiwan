/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

/*	var city = [{name: '台北市'},{name: '基隆市'},{name: '新北市'},{name: '宜蘭縣'},{name: '新竹縣'},{name: '新竹市'},{name: '桃園縣'},{name: '苗栗縣'},
   				{name: '台中市'},{name: '彰化縣'},{name: '南投縣'},{name: '嘉義縣'},{name: '嘉義市'},{name: '雲林縣'},{name: '台南市'},{name: '高雄市'},
    			{name: '澎湖縣'},{name: '屏東縣'},{name: '台東縣'},{name: '花蓮縣'},{name: '金門縣'},{name: '連江縣'}];

	City.create(city).exec(console.log);*/


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
