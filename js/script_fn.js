$(navFetch)
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


function paragraphListLoad(){
	$(".items").empty();
	fetch("paragraph.json").then(function(response){
		response.text().then(function(text){
			var data = JSON.parse(text);
			for(var title in data){
				$(".items").append('<section class="paragraph"><a href="#' + title + '"><h1>'+ title +'</h1><p id="date">마지막 수정일: '+ data[title].date+'</p><article><p>'+ data[title].article+'</p></article></a></section>');
			}
		})
	})
}

function navFetch(){
    fetch("TopicList.json").then(function(res){
        res.text().then(function(text){
            var NavList = JSON.parse(text);
            var Rep1=0;
            var Sentence = '';
            var pxls = ['90px', '240px','330px','450px','500px'];
            var pxRep = 0;
            while(Rep1<NavList.length){
                var factor = NavList[Rep1];
                if(factor.startsWith('*')){
                    if(Rep1 != 0) Sentence += '\n</ol>\n</div>\n</li>\n'
                    Sentence += '<li>';
                    Sentence += `\n <div class="Label"><a class="Cursor" href="#${factor.substr(1)}" onclick="FetchTopicTree('./data/TopicList')">${factor.substr(1)}</a></div>
                    `;
                    Sentence += `\n<div class="sub_nav_depth_1" style="display: none; left: ${pxls[pxRep]};">\n<ol>`;
                    pxRep = pxRep + 1;
                }else{
                    Sentence += `\n<li>\n <div class="Label"><a href="#${factor}" onclick="FetchTopicTree('./data/TopicList')">${factor}</a></div>\n</li>`
                }
                Rep1 = Rep1 + 1;
            }
            Sentence +='\n</ol>\n</div>\n</li>\n';
            document.querySelector('#menu .sub_nav').innerHTML=Sentence;
        });
    });
}


function writeCancle(){
	$("#writeForm").css("display", "none");
}


$(".writeArticle").on("click", writeArticle);

function writeArticle(){
	$("#writeForm").css("display", "block");
}