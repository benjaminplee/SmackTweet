$(function() {
	// THE "RIGHT" WAY TO DO IT
	ONLINE = window.navigator.onLine

	// HACK TO MAKE THINGS WORK EVEN IF BROWSER REPORTS ONLINE (e.g. chrome)
	$.ajax({
		url: 'online.json',
		cache: false,
		dataType: 'jsonp',
		jsonpCallback: 'onlineDetection',
		success: function(data) {
			ONLINE = ONLINE && data.online
		}
	})

})

var CURRENT_HANDLE = "twitter";

$('#peeps-list a').live('click', function() {
	CURRENT_HANDLE = $(this).html()
})


$('#tweets').live('pageshow',function(event, ui){
	$.mobile.loadingMessage = "Loading Tweets"
	$.mobile.pageLoading()

	if(ONLINE) {
		$.ajax({
			url: 'http://search.twitter.com/search.json',
			cache: false,
			dataType: 'jsonp',
			data: {
				q: 'from:' + CURRENT_HANDLE,
				rpp: 10
			},
			success: function(data) {
				$('#tweet-handle').html(CURRENT_HANDLE)
				
				var tweetList = $('#tweets-list')
				
				tweetList.html(' ')
				
				tweetList.append('<li data-role="list-divider">' + CURRENT_HANDLE + '\'s Tweets</li>')
				
				for(var i = 0; i < data.results.length; i++) {
					var result = data.results[i]
					tweetList.append('<li><b>' + result.from_user + '</b> said: \'' + result.text + '\'</li>')
				}
				
				tweetList.listview('refresh')
			},
			error: function() {
				alert('OH NOEZ!')
			},
			complete:  function() { 
				$.mobile.pageLoading(true)
			}
		})
	}
	else {
		$('#tweets-list').append('<li>OFFLINE ... can\'t get tweets right now. Try again later.</li>')
		$.mobile.pageLoading(true)
	}
})

$('#tweets').live('pagehide', function(event, ui) {
	$('#tweets-list').html(' ').listview('refresh')
})

$('#refresh').live('click', function() {
	window.applicationCache.update();
})

$('#addIt').live('click', function(event, ui) {
	var handle = $('#newHandle').val()
	var peepsList = $('#peeps-list')
	peepsList.append('<li id="' + handle + '"><a href="#tweets">' + handle + '</a></li>')
	peepsList.listview('refresh')
	return true;
})

$('#removeHandle').live('click', function() {
	$('li#' + CURRENT_HANDLE).remove()
	$('#peeps-list').listview('refresh')
	
	return true
})
