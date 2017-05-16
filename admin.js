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
		url:'/signup',
		data: { 

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
recharger();




function recharger (){

	$.ajax({ 
		url:'/auth',
		data: {} 
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

		var rael = converter.makeHtml(tab[0].text)
		$("#info").html(rael);


	});	

}


//-- affichage

$('#title').click(function(){
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
		url:'/delete',
		data: {
			_id: id,
		}
	});

});


//-- Modifier


$("#btnModif").click(function(){

	var contenu = {"titre" : $("#titreModif").val(), "text" : $("#infotitre").val()};
	var id = $(this).data('_id');
	
	$("#infotitre").val("");
	$("#titreModif").val("");
	
	$.ajax({
		url:'/update',
		data: {
			_id: id,
			value: JSON.stringify( contenu)
		}
	});
});



// $.ajax({
 	// url:'http://192.168.1.50/json-db',
  // 	data: {
  // 		task: 'delete',
  // 		key: 'MouadBlog'
  // 	}
  // });


// $.ajax({
//   url:'http://192.168.1.50/json-db',
//   data: {
//     task: 'get',
//     key: 'MouadBlog'
//     },
//    success: function(data){
//    }
//   });