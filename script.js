$(function() {
	// THE "RIGHT" WAY TO DO IT
	// var online = window.navigator.onLine

	// HACK TO MAKE THINGS WORK EVEN IF BROWSER REPORTS ONLINE (e.g. chrome)
	var online = false;
	
	$.ajax({
		url: 'online.json',
		cache: false,
		dataType: 'jsonp',
		jsonpCallback: 'onlineDetection',
		success: function(data) {
			online = data.online
		}
	})

	$('.showLatestTweet').click(function() {
		if(online) {	
			var handle = $(this).html()
		
			$.ajax({
				url: 'http://search.twitter.com/search.json',
				cache: false,
				dataType: 'jsonp',
				data: {
					q: 'from:' + handle,
					rpp: 1
				},
				success: function(data) {
					alert(handle + ' said: \'' + data.results[0].text + '\'')
				},
				error : function() {
					alert('OH NOEZ!')
				}
			})
		}
		else {
			alert('AINT GONNA DO IT!  WE IZ IN OFFLINE MODEZ!')
		}
		
		return false
	})
})