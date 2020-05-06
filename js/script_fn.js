
$(leftMenuLoad)
$(paragraphListLoad)

$(window).on('hashchange',leftMenuLoad);
$(window).on('hashchange',paragraphListLoad);

function leftMenuLoad(){
	$("#leftMenu").empty();
	fetch("leftMenu.json").then(function(response){
		response.text().then(function(text){
			var data = JSON.parse(text);
			var hashtag = location.hash.substr(1);
			var list = [];
			if(hashtag){
				for(var key in data){
					if(key == hashtag) list = data[key];
				}
			}else{
				list = data.main;
			}
			for(var item of list){
				$("#leftMenu").append("<li class='leftMenuItem'><a href='#"+item+"'>"+item+"</a></li>");
			}
		})
	})
}


//test script
function paragraphListLoad(){
	$(".items").empty();
	fetch("paragraph.json").then(function(response){
		response.text().then(function(text){
			var data = JSON.parse(text);
			for(var title in data){
				console.log(title);
				console.log(data[title].date);
				console.log(data[title].article);
				$(".items").append('<section class="paragraph"><a href="#' + title + '"><h1>'+ title +'</h1><p id="date">마지막 수정일: '+ data[title].date+'</p><article><p>'+ data[title].article+'</p></article></a></section>');
			}
		})
	})
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
}