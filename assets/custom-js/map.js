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

