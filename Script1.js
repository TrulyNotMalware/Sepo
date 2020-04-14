
var Cursors =document.getElementsByClassName('Cursor');
var subNavs =document.getElementsByClassName('sub_nav_depth_1');

for(var Rep1=0;Rep1<subNavs.length;Rep1++){
    (function(i){
        var Cursor = Cursors.item(i);
        var Nav = subNavs.item(i);
        Cursor.addEventListener('mouseover',function(event){
            Nav.style.display = "block";
            console.log(i);
        });
        Cursor.addEventListener('mouseout',function(event){
            Nav.style.display = "none";
        });
        Nav.addEventListener('mouseover',function(event){ Nav.style.display="block";})
        Nav.addEventListener('mouseout',function(event){
            Nav.style.display = "none";
        });
    })(Rep1);
}//Closure