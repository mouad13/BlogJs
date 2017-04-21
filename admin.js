window.onload=function() {
	horloge('div_horloge');
};

function horloge(el) {
	if(typeof el == "string") { el = document.getElementById(el); }
	function actualiser() {
		var date = new Date();
		var str = date.getHours();
		str += ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		str += ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
		el.innerHTML = str;
	}
	actualiser();
	setInterval(actualiser,1000);
}


//-- Administration

var titre = ""
var text = ""



$("#titre").keyup(function(){
	titre = $("#titre").val();

});	

$("#text").keyup(function(){
	text = $("#text").val();

});	


$("#button").click(function(){

	var contenu = {"titre" : titre, "text" : text}
	$("input").val("");
	$("textarea").val("");

	$.ajax({ 
		url:'http://192.168.1.50/json-db',
		data: { 
			task: 'set', 
			key: 'MouadBlog', 
			value: JSON.stringify(contenu),
		} 
	});
});

//-- showdown

$("#text").keyup(function(){
	
	var converter = new showdown.Converter(),
	text      = $('#text').val(),
	html      = converter.makeHtml(text);
	
	$("#texthtml").html(html);
});

//-- Site public
var tab;

$.ajax({ 
	url:'http://192.168.1.50/json-db', 
	data: { 
		task: 'get',
		key: 'MouadBlog', 
	} 
})
.done(function(data){

	tab=JSON.parse(data);
	console.log(tab);

	for (var i = 0; i < tab.length; i++) {
		$("#title").append('<option value="'+i+'">'+tab[i].titre+'</option>');
		$("#info").append('<div class="ID'+i+'">'+tab[i].text+'</div>');
		$('#info').html("");

		$('#contenu').append('<ul><li><a class="idlien" value="'+i+'">'+tab[i].titre+'</a></li></ul>')
	}

	$(".idlien").click(function(){
		var koko = $(this).attr('value');
		var lolo = tab[koko].text;
		$("#infotitre").html(lolo);
		$("#titreModif").val(tab[koko].titre);
		var id = tab[koko]._id;
		$('#btn').data('_id', id);
		$('#btnModif').data('_id', id);
	});

	var converter = new showdown.Converter(),
	html      = converter.makeHtml(text);
	$("#info").html(html);

});	



//-- affichage

$('#title').change(function(){
	var koko = $('#title').val();
	var lolo = tab[koko].text;
	
	var converter = new showdown.Converter(),
	text      = lolo;
	html      = converter.makeHtml(text);
	
	$("#info").html(html);

});


//-- Supprimer

$('#btn').click(function(){
	var id = $(this).data('_id');


	$.ajax({
		url:'http://192.168.1.50/json-db',
		data: {
			task: 'delete',
			_id: id,
		}
	});

});


$("#btnModif").click(function(){

	var contenu = {"titre" : $("#titreModif").val(), "text" : $("#infotitre").val()};
	var id = $(this).data('_id');
	
	$("#infotitre").val("");
	$("#titreModif").val("");
	
	$.ajax({
		url:'http://192.168.1.50/json-db',
		data: {
			task: 'update',
			_id: id,
			value: JSON.stringify( contenu)
		}
	});
});

