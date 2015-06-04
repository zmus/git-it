// NE RADI

/*
	Create an endpoint where you can send in a Twitter username. 
	It will call out to Twitter, get the latest 10 tweets and 
	display them to our back user.

	Code WON'T WORK ! Twitter changed its API so you have to authenticate even
	when you want to pull users twitter stream...
*/
var express = require('express');
var request = require('request');
var url = require('url');

var app = express();
/*
	get() = endpoint
	':username' = : means username is DYNAMIC - upišemo u browser ime koje trebamo
*/
app.get('/tweets/:username', function(req, response) {
	// grab the username out of the request parameters
	var username = req.params.username;

	// get the last 10 tweets for screen_name
	options = {
		protocol: 'http:',
		host: 'api.twitter.com', 
		pathname: '/1/statuses/user_timeline.json',
		query: {screen_name: username, count: 10}
	}

	var twitterUrl = url.format(options);
	/* 
		- call our request 'twitterUrl' 
		- the response will get turned back from that function call
		- and we pipe the response back in to the response that goes tog browser
	*/ 
	request(twitterUrl).pipe(response);

	//OR

	request(url, function(err, res, body) {
		var tweets = JSON.parse(body);
		response.locals = {tweets: tweets, name: username};
		response.render('tweets.ejs');
	});
});

app.listen(8080);