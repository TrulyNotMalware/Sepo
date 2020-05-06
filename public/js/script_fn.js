$(mainMenuLoad)
$(leftMenuLoad)
$(paragraphListLoad)

$(window).on('hashchange',leftMenuLoad);
$(window).on('hashchange',paragraphListLoad);

function mainMenuLoad(){
	console.log("start");
    fetch("js/TopicList.json").then(function(res){
        res.text().then(function(text){
			var NavList = JSON.parse(text);
			var Sentence = '';
			var Rep1 = 0;
			console.log(NavList);
            for (key in NavList){
				var factor = NavList[key];
				Sentence += '<li>';
				Sentence += `<a href="#${key}">${key}</a>`;
				Sentence += `<ul class="subMenu">`;
				while(Rep1<factor.length){
					Sentence += `<li><a href="#${factor[Rep1]}" >${factor[Rep1]}</a></li>`
					Rep1 = Rep1+1;
				}
				Rep1=0;
				Sentence +='</ul></li>';
				
			}
			$(".mainMenu").append(Sentence);
        });
    });
}

function leftMenuLoad(){
	$("#leftMenu").empty();
	fetch("js/leftMenu.json").then(function(response){
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


function paragraphListLoad(){
	$(".items").empty();
	fetch("js/paragraph.json").then(function(response){
		response.text().then(function(text){
			var data = JSON.parse(text);
			for(var title in data){
				$(".items").append('<section class="paragraph"><a href="#' + title + '"><h1>'+ title +'</h1><p id="date">마지막 수정일: '+ data[title].date+'</p><article><p>'+ data[title].article+'</p></article></a></section>');
			}
		})
	})
}




function writeCancle(){
	$("#writeForm").css("display", "none");
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
}