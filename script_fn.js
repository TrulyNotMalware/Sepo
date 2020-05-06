var Creater ={
    "Front-End" : "W2N2",
    "Back-End"  : "Randomshot",
    "Designer"  : "NONE",
    showName: function (){
        for(var Key in this){
            if(this.hasOwnProperty(Key)){
                document.write(Key +' : '+this[Key]+'<br>');
            }
        }
    }
}
