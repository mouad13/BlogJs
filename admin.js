window.onload=function() {
  horloge('div_horloge');
};
 
function horloge(el) {
  if(typeof el=="string") { el = document.getElementById(el); }
  function actualiser() {
    var date = new Date();
    var str = date.getHours();
    str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
    str += ':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
    el.innerHTML = str;
  }
  actualiser();
  setInterval(actualiser,1000);
}



var titre = ""
var text = ""




//-- markdown

$("#titre").keyup(function(){
	titre = $("#titre").val();

});	

$("#text").keyup(function(){
	text = $("#text").val();

});	



//-- Administration

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

$("#text").keyup(function(){
	
	var converter = new showdown.Converter(),
   	 	text      = $('#text').val(),
   	 	html      = converter.makeHtml(text);
	
	$("#texthtml").html(html);
});





//-- Site public

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
 		$("#title").append('<option value="ID'+i+'">'+tab[i].titre+'</option>');
 		$("#info").append('<div class="ID'+i+'">'+tab[i].text+'</div>');
 	}
});	


$('#title').on('change', function(){
	alert('changé !');


});





