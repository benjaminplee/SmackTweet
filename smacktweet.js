$(function() {
	var config = JSON.parse(localStorage.getItem('peeps')) || { peeps:['leebenjp'] }
	
	var peepsList = $('#peeps-list')
	
	for(var i = 0; i < config.peeps.length; i++) {
		peepsList.append('<li><a href="#tweets">' + config.peeps[i] + '</a></li>')
	}
	
	localStorage.setItem('peeps', JSON.stringify(config))
	
	peepsList.listview('refresh')
})

$('#peeps-list a').live('click', function() {
	$.mobile.loadingMessage = "Loading Tweets"
	$.mobile.pageLoading()
	
	var name = $(this).html()
	var tweetsList = $('#tweets-list')

	tweetsList.html('')
	
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
