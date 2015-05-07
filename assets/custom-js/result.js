$(function() {
	var limit = 10,
		tryCity = 0;
	checkCityLoad();

	$.ajax({
		method: "GET",
		url: "/list/rank",
		dataType: "json"
	})
	.fail(function (err) {
		console.log(err);
	})
	.done(function (data) {
		console.log(data.length);
		for (var i = 0, l = data.length; i < l; i++) {
			if(data[i].votes.length)
				$(".allRank").append('<tr><td>' + data[i].name + "</td><td>" + data[i].votes.length + "</td></tr>");
		};
	});
});



function voteByCity() {
	$(".votes-by-city").each(function (){
		var _this = $(this);
		var id = _this.attr('data-city');
		$.ajax({
			method: "GET",
			url: "/city/" + id + "/votes",
			dataType: "json"
		})
		.fail(function (err) {
			console.log(err);
		})
		.done(function (data) {
			for (var i = 0, l = data.length; i < l; i++) {
				_this.append(data[i].food + ":" + data[i].count + "<br>");
			};
		});
	})
}

function checkCityLoad () {
	if($('.lastCity').length){ 
		console.log('city loaded');
		voteByCity();
  	} else {
  		console.log('city loading...');
  		tryCity++;
  		if(tryCity > limit)
  			return;
    	setTimeout(checkCityLoad, 50); //wait 50 ms, then try again
	}
}


