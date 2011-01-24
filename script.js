$(function() {
	$('.showLatestTweet').click(function() {
		var handle = $(this).html();
		
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
		
		return false
	})
})