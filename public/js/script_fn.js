$(mainMenuLoad);
$(leftMenuLoad);
$(paragraphLoad);
$(breadcrumbLoad);
$(loginSessionLoad);


$(window).on('hashchange',leftMenuLoad);
$(window).on('hashchange',paragraphLoad);
$(window).on('hashchange',breadcrumbLoad);

var sessionName = '';
var currentArticleAuthor = '';
var currentArticleIndex = 0;

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
		$(".items").append('<section class="paragraph"><a onclick="viewArticle(this);"><h1>'+ result[item].title +'</h1><p id="index_article">'+result[item].number+'</p><p id="author">글쓴이: '+ result[item].author +'</p><p id="date">마지막 수정일: '+ result[item].date+'</p><article><p>'+ result[item].contents +'</p></article></a></section>');
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

function modifyCancle(){
	$("#modify").css("display","none");
}
function modifyShow(){
	$("#modify").css("display","block");
}
$("#modify").on("click",modifyShow);

function writeCancle(){
	$("#writeForm").css("display", "none");
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
}

function viewArticle(item){
	currentArticleIndex = item.getElementsByTagName("p")[0].innerText;
	currentArticleAuthor = item.getElementsByTagName("p")[1].innerText;
	$("#viewArticle").css("display", "block");
	$("#viewArticle .paragraph h1").text(item.getElementsByTagName("h1")[0].innerText);
	$("#viewArticle .paragraph #index_article").text(currentArticleIndex);
	$("#viewArticle .paragraph #author").text(currentArticleAuthor);
	$("#viewArticle .paragraph #date").text(item.getElementsByTagName("p")[2].innerText);
	$("#viewArticle .paragraph article").text(item.getElementsByTagName("article")[0].innerText);
    viewComment();
    //currentArticleIndex for wirte comment
    comment.origin_number.value = currentArticleIndex;
}

function loginSessionLoad(){
	$("#logInOut").empty();
	$.ajax({
		url:'/session',
		dataType:'json',
		type:'POST',
		data: {'msg' :"help"},
		success: function(result){
			if(!result.name){
				sessionName = '';
				$("#logInOut").append("<a href = login.html#!login>Login</a>");
				$(".writeMenu").css("display", "none");
			}else{
				sessionName = result.name;
				$("#logInOut").append("<a href = '/log_out'>Logout<br></a>" + sessionName);
				$("#logInOut").append(`<br><a>회원 정보 수정</a>`);
				$(".writeMenu").css("display", "block");
				$("#modify").append(`<p>${result.name}</p>`);
			}
		}
	});
}



function delArticle(){
	if(currentArticleAuthor.slice(5) == sessionName){
		$.ajax({
			url:'/delArticle',
			dataType:'json',
			type:'POST',
			data: {'number' :currentArticleIndex},
			success: function(result){
			}
		});
		alert(currentArticleAuthor.slice(5) + "님의 글이 삭제 되었습니다.. ");
        document.location.reload();
	}else{
		alert("본인의 글만 삭제 가능합니다.");
        document.location.reload();
	}
}

function viewComment(){
	console.log("comment 원본글" + currentArticleIndex);
	$(".commentList").empty();
	$.ajax({
			url:'/jsonComment',
			dataType:'json',
			type:'POST',
			data: {'msg' :"help"},
			success: function(result){
				console.log(result);
				for(var item in result){
					if(result[item].origin_num == currentArticleIndex){
						$(".commentList").append("<li><p><b>"+result[item].author+"</b>"+result[item].date+"</p><p>"+result[item].contents+"</p></li>");
					}
				}
			}
	});
}