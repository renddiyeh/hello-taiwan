var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("js/twCounty2010.topo.json", function(error, data) {
	if (error) return console.error(error);
	
    var topodata = topojson.feature(data, data.objects.layer1);
  	var projection = d3.geo.mercator().center([120.979531, 23.978567]).scale(5000);

 	var geoPath = d3.geo.path().projection(projection);

  	svg.selectAll("path")
  		.append("path").data(topodata).attr("d", geoPath);

});