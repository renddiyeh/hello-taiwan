$(function() {
	$('.home-city').dk_tw_citySelector('.county', '.district', '.zipcode');

	var jobs = [
		'農、林、漁、牧業','礦業及土石採取業','製造業','電力及燃氣供應業','用水供應及污染整治業',
		'營造業','批發及零售業','運輸及倉儲業','住宿及餐飲業','資訊及通訊傳播業','金融及保險業',
		'不動產業','專業、科學及技術服務業','支援服務業','公共行政及國防','強制性社會安全','教育服務業',
		'醫療保健及社會工作服務業','藝術、娛樂及休閒服務業','其他服務業','家管','學生','待業中'
	];
	for (var i = 1, length = jobs.length; i <= length; i++) {
		var option = $('<option>').attr('value', i).text(jobs[i-1]);
		$('#job').append(option);
	};
	
	var salary = ['30萬以下','31-50萬','51-80萬','81-100萬','101-150萬','151-200萬','201萬以上'];
	for (var i = 1, length = salary.length; i <= length; i++) {
		var option = $('<option>').attr('value', i).text(salary[i-1]);
		$('#salary').append(option);
	};

	$.get('/city', function (city) {
		for (var i = 1, length = city.length; i <= length; i++) {
			var option = $('<option>').attr('value', i).text(city[i-1].name);
			$('#curCity').append(option);
		};
	});
});