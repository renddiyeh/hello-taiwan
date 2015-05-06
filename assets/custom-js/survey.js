$(function() {
	// Bind to StateChange Event

	$('#fullPage').fullpage();

	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.statechange
        var page = State.data.page;
        console.log(page);

        $.fn.fullpage.moveTo('Question ' + page);
     	
    });
    History.replaceState({page:0}, null, '?hello-taiwan');

	$.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    $('button.next').click(function(e) {
    	e.preventDefault();
    	var q = $(this).attr('data-num');
    	History.pushState({page:q}, "Question " + q, "?q=" + q);
    });

    $('button.prev').click(function(e) {
    	e.preventDefault();
    	var q = $(this).attr('data-num');
    	History.pushState({page:q}, "Question " + q, "?q=" + q);
    });

	$('.home-city').dk_tw_citySelector('.city', '.district', '.zipcode');

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