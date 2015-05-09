$(function() {

	$('#fullPage').fullpage();

	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.statechange
        var page = State.data.name;
        $.fn.fullpage.moveTo(page);     	
    });
    History.replaceState({page:0, name: 'hello'}, "Hello! Taiwan", '?hello');

	$.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    var validate = function(section) {
    	var ok = true;
    	var required = section.find('[required]');
    	required.each(function() {
    		if(!$(this).val()) {
    			ok = false;
    			$(this).trigger('focus');
    			return false;
    		}
    	});
    	return ok;
    }
    var second = 0;
    var duration = [0,0,0,0];

    $('.next').click(function(e) {
    	var q = $(this).attr('data-num');
    	if (q>1) {
    		var section = $(this).closest('.section');
    		if(validate(section)){
    			duration[q-2] = second - duration[q-3] || second;
    			History.pushState({page:q, name: 'question-' + q}, "Question " + q, "?q=" + q);
    		}
    			
    	} else {
    		var timer = setInterval(function() {second+=1}, 1000);
    		History.pushState({page:q, name: 'question-' + q}, "Question " + q, "?q=" + q);
    	}
    });

	var jobs = [
		'勞務人員','一般技術人員','一般行政、事務職員','業務人員','管理階層',
		'軍人／政府機關／教職人員','自營業','專門自由業（如：醫師、律師等）',
		'農／林／漁／牧人員','學生','待業中／無業／退休','家庭主婦／夫','其他'
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
			option.clone().appendTo('#curCity');
			option.clone().appendTo('.city');
		};
	});

	$('.city').change(function() {
		if($(this).find(':selected').val() == 23)
			$('.otherCity').attr('type', 'text').focus();
		else 
			$('.otherCity').attr('type', 'hidden').val('');
	});

	$("#survey").submit(function (e) {
		e.preventDefault();
		var data = $(this).serialize();
		duration[3] = second - duration[2];
		for (var i = 0; i < duration.length; i++) {
			data += '&duration%5B%5D=' + duration[i];
		};

		$.post("/vote", data).done(function(data) {
			console.log(data)
			if(data == 'success'){
				$("#survey")[0].reset();
				History.pushState({page:4, name: 'finish'}, "Thank you!", "?thank-you");
			}
		})
	})

});