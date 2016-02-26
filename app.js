var express = require('express');
var FS = require('fs');
var parser = require('rss-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	// res.render('index');
	parser.parseURL('http://www.regenexx.com/feed/', function(err, parsed) {
		FS.writeFileSync('result.json', JSON.stringify(parsed, null, 2));
		parsed.feed.entries.forEach(function(entry) {
			console.log(entry.title + ':' + entry.link);
		});
		res.send(parsed.feed.entries[0].title);
	});
});

var server = app.listen(8720, function() {
	console.log('Express server listening on port ' + server.address().port);
});
