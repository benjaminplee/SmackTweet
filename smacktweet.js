$('#peeps-list a').live('click', function() {
	$.mobile.loadingMessage = "Loading Tweets"
	$.mobile.pageLoading()
	
	var tweetsList = $('#tweets-list')
	tweetsList.html('')
	
	var name = $(this).html()
	$.ajax({
		url: 'http://search.twitter.com/search.json',
		cache: false,
		dataType: 'jsonp',
		data: {
			q: 'from:' + name,
			rpp: 10
		},
		success: function(data) {
			for(var i = 0; i < data.results.length; i++) {
				tweetsList.append("<li>" + data.results[i].text + "</li>")
			}
			
			tweetsList.listview('refresh')
		},
		error: function() {
			alert('OH NOEZ!')
		},
		complete:  function() { 
			$.mobile.pageLoading(true)
		}
	})
	
	CURRENT_PEEP = name
	
})

$('#addIt').live('click', function() {
	var peepsList = $('#peeps-list')
	
	peepsList.append("<li><a href='tweets'>" + $('#newPeep').val() + "</a></li>")
	
	peepsList.listview('refresh')
	
	var config = JSON.parse(localStorage.getItem('peeps'))
	config.peeps.push($('#newPeep').val())
	localStorage.setItem('peeps', JSON.stringify(config))
	
	return true
})

$('#removePeep').live('click', function() {
	var peep = $("#peeps-list li:contains('" + CURRENT_PEEP + "')")
	peep.remove()
	$('#peeps-list').listview('refresh')
	
	var config = JSON.parse(localStorage.getItem('peeps'))
	config.peeps = $.map(config.peeps, function(element) {
		return element === CURRENT_PEEP ? null : element;
	})
	localStorage.setItem('peeps', JSON.stringify(config))
	
	return true
})

$(function() {
	var config = JSON.parse(localStorage.getItem('peeps')) || { peeps:['stlmobiledev'] }
	
	var peepsList = $('#peeps-list')
	for(var i = 0; i < config.peeps.length; i++) {
		peepsList.append('<li><a href="#tweets">' + config.peeps[i] + '</a></li>')
	}
	
	localStorage.setItem('peeps', JSON.stringify(config))
	
	peepsList.listview('refresh')
})


