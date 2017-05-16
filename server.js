var express = require('express');
var bodyParser = require('body-parser');
var uuidV1 = require('uuid/v1');
var nodefs = require("fs");


var app = express();

var contenu = [];
charge();
//app.set('views', './views');
//app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname+ '/'));

function charge(){
		
	nodefs.readFile('blog.json',function(err,data){
		if(err)throw err
			contenu=JSON.parse(data);
		
		//console.log(contenu);
	});

}

function enreg (response){
	var koko = JSON.stringify(contenu);
	nodefs.writeFile('blog.json', koko, function(err, data){
		if(err)throw err
		response.send("ok");

	})
}



app.get('/signup', function(req, res){
	
	// rajouter un identifiant unique
	var id = uuidV1();
	var article = JSON.parse(req.query.value)
	article._id = id;
	contenu.push(article);
	console.log(contenu);

	enreg(res);
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
	enreg (res);
});



app.get('/update', function(req, res){

	var id = (req.query._id); 

	for (var i = 0; i < contenu.length; i++){
		if (contenu[i]._id == id) {
			contenu[i] = JSON.parse(req.query.value)
			continue;
		}
	}

	enreg (res);
});
			






app.listen(3300, function () {
	console.log('posqkdpok');

})
