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

const slabel ={
    template: `<label :class="{ selected : isActive }" @click="isClicked" :value="isActive">{{ value }}</label>`,
    data(){
        return {
            isActive: false
        }
    },
    props:{
        value:{
            type:String,
            required: true
        }
    },
    methods:{
        isClicked(){
            this.isActive = !this.isActive;
        }
    }
    
};

function test(){
    $(".selected").attr("value","false");
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
				Sentence += `<slabel value="${key}"></slabel>`;
				Sentence += `<ul class="subMenu">`;
				while(Rep1<factor.length){
					Sentence += `<li><a href="#${factor[Rep1]}">${factor[Rep1]}</a></li>`
					Rep1 = Rep1+1;
				}
				Rep1=0;
				Sentence +='</ul></li>';
			}
			$(".mainMenu").append(Sentence);
			var Views = new Vue({
				el:'.menu',
				components:{
                        slabel
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
		var starthtml = '<section class="paragraph" onclick="viewArticle(this)"><h1>'+ result[item].title +'</h1><p id="index_article">'+result[item].number+'</p><p id="author">글쓴이: '+ result[item].author +'</p><p id="date">마지막 수정일: '+ result[item].date+'</p><article><p>'+ result[item].contents +'</p>';
		var midhtml = '';
		var endhtml = '</article></section>';
		if(result[item].path != "-1"){
			var filepath = result[item].path.slice(17);
			if(filepath.slice(-4).toUpperCase() == ".JPG" || filepath.slice(-4).toUpperCase() == ".PNG" || filepath.slice(-4).toUpperCase() == ".GIF" || filepath.slice(-4).toUpperCase() == "BMP" || filepath.slice(-4).toUpperCase() == "JPEG"){
				midhtml = '<img src="' + filepath +'" width = 200px>';
			}
			midhtml = midhtml + '<a href="' + filepath + '" download="' + filepath + '">파일 다운로드 : ' + filepath + '</a>';
		}
		$(".items").append(starthtml + midhtml + endhtml);
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

function searchLoad(){
	$.ajax({
		url:'/search',
		dataType:'json',
		type:'POST',
		data: {'msg' :"help"},
		success: function(result){
			paragraphListLoad(result);
		}
	});
}

$("#search_form").submit(searchLoad);

function breadcrumbLoad(){
	$(".breadCrumb").empty();
	var hash = window.location.hash.substr(1);
	var Sentence = `<span class="BreadCrumbLine">Index</span>\n<span class="divider">/</span>`;
	if(hash){
		Sentence += `<span>${hash}</span><span class="divider">/ </span>`;
	}
	$(".breadCrumb").append(Sentence);
}

function modifyCancel(){
	$("#modify").css("display","none");
}
function modifyShow(){
	$("#modify").css("display","block");
}
$("#modify").css("display","none");
$(".changepw").on("click",modifyShow);

function writeCancle(){
	$("#writeForm").css("display", "none");
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
    $("#writeForm .hashvalue").val(window.location.hash);
}

function viewArticle(item){
	var top_position = $(item).position().top + 350;
	$("#viewArticle").css("top", top_position);
	console.log(item);
	currentArticleIndex = item.getElementsByTagName("p")[0].innerText;
	currentArticleAuthor = item.getElementsByTagName("p")[1].innerText;
	$("#viewArticle").css("display", "block");
	$("#viewArticle .paragraph h1").text(item.getElementsByTagName("h1")[0].innerText);
	$("#viewArticle .paragraph #index_article").text(currentArticleIndex);
	$("#viewArticle .paragraph #author").text(currentArticleAuthor);
	$("#viewArticle .paragraph #date").text(item.getElementsByTagName("p")[2].innerText);
	$("#viewArticle .paragraph article").html(item.getElementsByTagName("article")[0].innerHTML);
	$("#viewArticle img").css("width","70%");
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
            $(".userEmail").val(result.email);
			if(!result.name){
				sessionName = '';
				$("#logInOut").append("<a href = login.html#!login>Login</a>");
				$(".writeMenu").css("display", "none");
			}else{
				sessionName = `${result.name}`;
				$("#logInOut").append(`<a href = '/log_out'>Logout</a>${sessionName}`);
				$("#logInOut").append(`<a class="changepw" onclick="modifyShow()">회원 정보 수정</a>`);
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

function delComment(comment){
	var commentHTML = $(comment).parents('p').html();
	var author = $(commentHTML)[0].innerText;
	var date = $(commentHTML)[1].innerText;
	console.log(author);
	console.log(date);
	if(author == sessionName){
		$.ajax({
			url:'/delComment',
			dataType:'json',
			type:'POST',
			data: {'author' :author, 'date' :date},
			success: function(result){
			}
		});
		alert(sessionName + "님의 댓글이 삭제 되었습니다.");
		viewComment();
	}
	else{
		alert("본인의 댓글만 삭제 가능합니다.");
	}
}

function viewComment(){
	$(".commentList").empty();
	$.ajax({
			url:'/jsonComment',
			dataType:'json',
			type:'POST',
			data: {'msg' :"help"},
			success: function(result){
				for(var item in result){
					if(result[item].origin_num == currentArticleIndex){
						$(".commentList").append("<li><p><b>"+result[item].author+"</b><span>"+result[item].date+"</span><a href='javascript:void(0);' onclick='delComment(this)'> [삭제]</a></p><p>"+result[item].contents+"</p></li>");
					}
				}
			}
	});
}


function search(){
//	console.log($(".search>select option:selected").val());
//	console.log($(".search>input").val());
	$(".items > section").hide();
	var items = $(".items > section");
//	console.log(items);
	for(var item of items){
		if(item.innerText.indexOf($(".search>input").val()) != -1) $(item).show();
	}
}

$(".search > input").on("change keyup paste", function(){
	search();
	if ($(".search>input").val() == "tetris") {
		$(".game iframe").attr("src", ".tetris/tetris.html")
		$(".game").show();
	}
	if ($(".search>input").val() == "pacman") {
		$(".game iframe").attr("src", ".pacman/pacman.html")
		$(".game").show();
	}
});



$(".game button").on("click", function(){
	$(".game").hide();
})
