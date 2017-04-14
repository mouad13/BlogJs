var blog = [];
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
	blog.push(contenu);

  $.ajax({ 
    url:'http://192.168.1.50/json-db',
     data: { 
      task: 'set', 
      key: 'MouadBlog', 
      value: JSON.stringify(blog),
    } 
  
  });

});


function Blog(tab){
 	for (var i = 0; i < tab.length; i++) {
 		$("#title").append('<div>'+tab[i][i].titre+'</div>');
 		$("#info").append('<div>'+tab[i][i].text+'</div>')
 	}
}



function charger(){
	$.ajax({ 
		url:'http://192.168.1.50/json-db', 
		data: { 
			task: 'get',
			key: 'MouadBlog', 
			} 
	})
	.done(function(data){

		blog=JSON.parse(data);
		console.log(blog);
		Blog(blog);
	});	

			
   //console.log(data);
}



charger();

