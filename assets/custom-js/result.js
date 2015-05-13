d3.json('/list/rank', function(error, data) {
	if (error) return console.error(error);
	// data.name data.votes.length
	var max = d3.max(data, function(d){ return d.votes.length }),
		scale = d3.scale.linear().range([0, 80]).domain([0, max]);

	var row = d3.select('#allRank').selectAll('div').data(data)
				.enter().append('div').attr('class', 'row collapse votes');
	row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.name });

	var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
	bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.votes.length) + '%' });
	bar.append('div').attr('class', 'vote').text(function(d) { return d.votes.length });

  $('.more').click(function() {
    if($(this).hasClass('expanded')){
      $('#allRank').css('max-height', '9.5em');
      $(this).html('&raquo; Show more');
    } else {
      $('#allRank').css('max-height', '100vh');
      $(this).html('&laquo; Show less');
    }    

    $(this).toggleClass('expanded');    
  })

/*  $('#allRank .votes:lt(5)').show();
  $('#allRank').append('<div><p class="_show show-more">&raquo; Show more...</p></div>');
  $('#allRank').append('<div><p class="_show show-less hide">&laquo; Show less...</p></div>');

  $('#allRank .show-more').click(function(){
    var container = $(this).parents('.chart');
    container.find('.hide').removeClass('hide');
    $(this).addClass('hide');
  });

  $('#allRank .show-less').click(function(){
    var container = $(this).parents('.chart');
    container.find('.votes:gt(5)').addClass('hide');
    container.find('.show-more').removeClass('hide');
    $(this).addClass('hide');
  });*/
});

d3.json('/city/votes', function(error, data) {
	if (error) return console.error(error);

	var div = d3.select('#voteByCityBubble').selectAll('div').data(data).enter();
	var city = div.append('div').attr('class', 'city hide')
    .attr('data-name', function(d) { return d.name });
	city.append('h5').text(function(d) { return d.name });
  city.append('p').text(function(d) { return (d.votes.length==0) ? '這個地區還沒有人來投票，快邀請你的好友來幫忙吧！' : '' });

  city.each(function (item, i) {
    
    var max = d3.max(item.votes, function(d){ return d.count }),
    scale = d3.scale.linear().range([0, 80]).domain([0, max]);

    var row = d3.select(this).selectAll('div').data(function(d) { return d.votes }).enter()
      .append('div').attr('class', 'row collapse votes hide');

    row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.food });

    var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
    bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.count) + '%' });
    bar.append('div').attr('class', 'vote').text(function(d) { return d.count });

  })

  var accordion = d3.select('#voteByCityAccordion ul').selectAll('li').data(data).enter();
  var li = accordion.append('li').attr('class', 'accordion-navigation');
  li.append('a').attr('href', function(d) { return '#city' + d.id }).text(function(d) { return d.name });
  var content = li.append('div').attr('id', function(d) { return 'city' + d.id }).attr('class', 'content');
  content.append('p').text(function(d) { return (d.votes.length==0) ? '這個地區還沒有人來投票，快邀請你的好友來幫忙吧！' : '' });

  content.each(function (item, i) {
    
    var max = d3.max(item.votes, function(d){ return d.count }),
    scale = d3.scale.linear().range([0, 80]).domain([0, max]);

    var row = d3.select(this).selectAll('div').data(function(d) { return d.votes }).enter()
      .append('div').attr('class', 'row collapse votes');

    row.append('div').attr('class', 'small-3 medium-4 columns').append('p').text(function(d) { return d.food });

    var bar = row.append('div').attr('class', 'small-9 medium-8 columns');
    bar.append('div').attr('class', 'bar').style('width', function(d) { return scale(d.count) + '%' });
    bar.append('div').attr('class', 'vote').text(function(d) { return d.count });
  })

  $('.city').each(function() {
    $(this).find('.votes:lt(5)').show();
    if($(this).find('.votes').length > 5) {
      $(this).append('<div><p class="_show show-more">&raquo; Show more...</p>');
      $(this).append('<div><p class="_show show-less hide">&laquo; Show less...</p>');
    }    
  });

  $(document).foundation();

  $('.city .show-more').click(function(){
    var container = $(this).parents('.city');
    container.find('.hide').removeClass('hide');
    $(this).addClass('hide');
  });

  $('.city .show-less').click(function(){
    var container = $(this).parents('.city');
    container.find('.votes:gt(4)').addClass('hide');
    container.find('.show-more').removeClass('hide');
    $(this).addClass('hide');
  });
	
})

$(function() {
  var selectCity = function(city) {
    $('#map .map path').attr('selected', false);
    $('#map .city-label').attr('selected', false);
    $('#' + city).attr('selected', true);
    $('#map [data-city='+city+']').attr('selected', true);
    $('.city').addClass('hide');
    $('#voteByCityBubble [data-name='+city+']').removeClass('hide');
  }
  $('#map path').click(function() {    
    var city = $(this).attr('id');
    selectCity(city);
  })
  $('#map .city-label').click(function() {
    var city = $(this).attr('data-city');
    selectCity(city);
  })
  $('#map polyline').click(function() {
    var city = $(this).attr('data-city');
    selectCity(city);
  })

})