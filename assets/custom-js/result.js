d3.json('/list/rank', function(error, data) {
	if (error) return console.error(error);
	// data.name data.votes.length
	var max = d3.max(data, function(d){ return d.votes.length }),
		scale = d3.scale.linear().range([0, 80]).domain([0, max]);

	var row = d3.select('#allRank').selectAll('div').data(data)
				.enter().append('div').attr('class', 'row collapse');
	row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.name });

	var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
	bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.votes.length) + '%' });
	bar.append('div').attr('class', 'vote').text(function(d) { return d.votes.length });
});

d3.json('/city/votes', function(error, data) {
	if (error) return console.error(error);

	var div = d3.select('#voteByCityBubble').selectAll('div').data(data).enter();
	var city = div.append('div').attr('class', 'city hide')
    .attr('data-name', function(d) { return d.name });
	city.append('h5').text(function(d) { return d.name });
  city.append('div').attr('class', 'desc').append('p').text('500名遊客騎著機車進行1日環島，帶來的是垃圾人潮而非錢潮。');

  city.each(function (item, i) {
    
    var max = d3.max(item.votes, function(d){ return d.count }),
    scale = d3.scale.linear().range([0, 80]).domain([0, max]);

    var row = d3.select(this).selectAll('div').data(function(d) { return d.votes }).enter()
      .append('div').attr('class', 'row collapse');

    row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.food });

    var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
    bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.count) + '%' });
    bar.append('div').attr('class', 'vote').text(function(d) { return d.count });

  })

  var accordion = d3.select('#voteByCityAccordion ul').selectAll('li').data(data).enter();
  var li = accordion.append('li').attr('class', 'accordion-navigation');
  li.append('a').attr('href', function(d) { return '#city' + d.id }).text(function(d) { return d.name });
  var content = li.append('div').attr('id', function(d) { return 'city' + d.id }).attr('class', 'content');
  content.append('span').attr('class', 'desc').append('p').text('500名遊客騎著機車進行1日環島，帶來的是垃圾人潮而非錢潮。');

  content.each(function (item, i) {
    
    var max = d3.max(item.votes, function(d){ return d.count }),
    scale = d3.scale.linear().range([0, 80]).domain([0, max]);

    var row = d3.select(this).selectAll('div').data(function(d) { return d.votes }).enter()
      .append('div').attr('class', 'row collapse');

    row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.food });

    var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
    bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.count) + '%' });
    bar.append('div').attr('class', 'vote').text(function(d) { return d.count });

  })

  $(document).foundation();

	
})

d3.json("/js/twCounty2010merge.topo.json", function(error, data) {
	if (error) return console.error(error);

    var topodata = topojson.feature(data, data.objects.layer1);

    //console.log(topodata);

  	var projection = d3.geo.mercator().center([120.979531, 23.978567]).scale(60000);

 	  var geoPath = d3.geo.path().projection(projection);

  	d3.select("svg#map").append("g")
  		.selectAll("path")
  		.data(topodata.features).enter()
  		.append("path").attr("d", geoPath)	  		
  		.attr("title", function(d) { return d.properties.name });

  	$('#map path').qtip({
  		position: {
  			my: 'bottom center',
        	target: 'mouse'
    	},
    	style: {
    		classes: 'qtip-bootstrap'
    	}
  	}).click(function() {
  		$('#map path').attr('selected', false);
  		$(this).attr('selected', true);
  		var city = $(this).attr('title');
  		$('.city').addClass('hide');
  		$('#voteByCityBubble [data-name='+city+']').removeClass('hide');
  	})
});


