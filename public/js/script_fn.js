$(mainMenuLoad);
$(leftMenuLoad);
$(paragraphListLoad);
$(breadcrumbLoad);

$(window).on('hashchange',leftMenuLoad);
$(window).on('hashchange',paragraphListLoad);
$(window).on('hashchange',breadcrumbLoad);

function jsonLoad(){
	$.ajax({

		url:'/',
		dataType:'json',
		type:'POST',
		data: {'msg' :"help"},
		success: function(result){
			

		}
	});
}

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
				Sentence += `<label>${key}</label>`;
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
				$(".items").append('<section class="paragraph"><a onclick="viewArticle(this);"><h1>'+ title +'</h1><p id="date">마지막 수정일: '+ data[title].date+'</p><article><p>'+ data[title].article+'</p></article></a></section>');
			}
		})
	})
}

function breadcrumbLoad(){
	$(".breadCrumb").empty();
	var hash = window.location.hash.substr(1);
	var Sentence = `<span class="BreadCrumbLine">Index</span>\n<span class="divider">/</span>`;
	if(hash){
		Sentence += `<span>${hash}</span><span class="divider">/ </span>`;
	}
	$(".breadCrumb").append(Sentence);
}



function writeCancle(){
	$("#writeForm").css("display", "none");
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
}


function viewArticle(item){
	$("#viewArticle").css("display", "block");
	$("#viewArticle .paragraph h1").text(item.getElementsByTagName("h1")[0].innerText);
	$("#viewArticle .paragraph #date").text(item.getElementsByTagName("p")[0].innerText);
	$("#viewArticle .paragraph article").text(item.getElementsByTagName("article")[0].innerText);
}