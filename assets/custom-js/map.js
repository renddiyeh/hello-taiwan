d3.json("js/twCounty2010merge.topo.json", function(error, data) {
	if (error) return console.error(error);

    var topodata = topojson.feature(data, data.objects.layer1);

    //console.log(topodata);

  	var projection = d3.geo.mercator().center([120.979531, 23.978567]).scale(50000);

 	var geoPath = d3.geo.path().projection(projection);

  	d3.select("svg#map").selectAll("path").data(topodata.features).enter()
  		.append("path").attr("d", geoPath)
  		.attr("title", function(d) { return d.properties.name });

  	$("#map path").tooltipsy();
});

var limit = 10,
	tryCity = 0;
checkCityLoad();

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
			console.log(data.length);
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


