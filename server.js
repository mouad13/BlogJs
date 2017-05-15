var express = require('express');
var bodyParser = require('body-parser');
var uuidV1 = require('uuid/v1');


var app = express();

var contenu = [];
//app.set('views', './views');
//app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname+ '/'));




app.get('/signup', function(req, res){
	
	// rajouter un identifiant unique
	var id = uuidV1();
	var article = JSON.parse(req.query.value)
	article._id = id;
	contenu.push(article);
	console.log(contenu);

});
	

app.get('/auth', function(req, res){

	res.send(JSON.stringify(contenu));


});

app.get('/delete', function(req, res){

	var id = (req.query._id); 

	for (var i = 0; i < contenu.length; i++){
		if (contenu[i]._id == id) {
			contenu.splice(i,1);
			continue;
		}
	}
});







app.listen(3300, function () {
	console.log('posqkdpok');

})
