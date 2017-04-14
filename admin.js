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
//console.log(blog);

  $.ajax({ 
    url:'http://192.168.1.50/json-db',
     data: { 
      task: 'set', 
      key: 'MouadBlog', 
      value: JSON.stringify(blog),
    } 
  
  });

});


$.ajax({
  url:'http://192.168.1.50/json-db',
  data: {
    task: 'get',
    key: 'MouadBlog'
    },
   success: function(data){
     console.log(data);
   }
  });