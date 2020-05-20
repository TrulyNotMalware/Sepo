$(mainMenuLoad);
$(leftMenuLoad);
$(paragraphLoad);
$(breadcrumbLoad);
$(loginSessionLoad);

$(window).on('hashchange',leftMenuLoad);
$(window).on('hashchange',paragraphLoad);
$(window).on('hashchange',breadcrumbLoad);


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
				Sentence += `<label :class="{ selected : isActive }">${key}</label>`;
				Sentence += `<ul class="subMenu">`;
				while(Rep1<factor.length){
					Sentence += `<li><a href="#${factor[Rep1]}" @click="isClicked">${factor[Rep1]}</a></li>`
					Rep1 = Rep1+1;
				}
				Rep1=0;
				Sentence +='</ul></li>';
			}
			$(".mainMenu").append(Sentence);
			var Views = new Vue({
				el:'.menu',
				data: {
					isActive: false
				},
				methods: {
					isClicked(){
						this.isActive = !this.isActive;
					}
				}
			});	
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

function paragraphListLoad(result){
	$(".items").empty();
	for(var item in result){
		$(".items").append('<section class="paragraph"><a onclick="viewArticle(this);"><h1>'+ result[item].title +'</h1><p id="index_article">'+result[item].index+'</p><p id="author">글쓴이: '+ result[item].author +'</p><p id="date">마지막 수정일: '+ result[item].date+'</p><article><p>'+ result[item].contents +'</p></article></a></section>');
	}
}

function paragraphLoad(){
	$.ajax({
		url:'/json',
		dataType:'json',
		type:'POST',
		data: {'msg' :"help"},
		success: function(result){
			paragraphListLoad(result);
		}
	});
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
	$("#viewArticle .paragraph #date").text(item.getElementsByTagName("p")[1].innerText);
	$("#viewArticle .paragraph #date").text(item.getElementsByTagName("p")[2].innerText);
	$("#viewArticle .paragraph article").text(item.getElementsByTagName("article")[0].innerText);
}

function loginSessionLoad(){
	$.ajax({
		url:'/session',
		dataType:'json',
		type:'POST',
		data: {'msg' :"help"},
		success: function(result){
			$("#logInOut").empty();
			if(!result.name){
				$("#logInOut").append("<a href = login.html#!login>Login</a>");
				$("#writeForm").css("display", "none");
			}else{
				$("#logInOut").append("<a href = '/log_out'>Logout<br></a>" + result.name);
				$("#writeForm").css("display", "block");
			}
		}
	});
}

function delArticle(){

}