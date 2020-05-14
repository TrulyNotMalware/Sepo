var moment = require('moment');
var multer = require('multer');
var mime = require('mime-types');

var mysql = require('/root/wp/db/mysql.js');
var storage = multer.diskStorage({

    destination : function(req,file,cb){
        cb(null,'/root/wp/download');
    },
    filename : function(req,file,cb){


        cb(null,moment().format('YYYY-MM-DD HH:mm:ss')+":"+file.originalname);
    }
    
    
});

var maxFileSize= 3*1000*1000;
var upload = multer({storage : storage,limits:{files:12, fileSize: maxFileSize}}).array('files',12);

/*
//upload file
function upload_file(req,res,next){
    upload(req,res,function(err){});
      
    
    //console.log(req); 
    res.send('<script type = "text/javascript">alert("파일이 업로드 되었습니다."); document.location.href = "/upload.html"</script>');

};

//download file
function download_file(req,res){

    var file = './download/test.txt';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition','attachment; filename = ' + filename);
    res.setHeader('Content-type',mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
};
*/
function write(req,res,next){
    

    var title;
    var contents;
    var file_path;
    var date;
    var author;
    var i = 1;
    if(req.files[0] != undefined){

        file_path = req.files[0].path;
        while(1){
            if(req.files[i] == undefined) break;
            file_path = file_path + "," + req.files[i].path;
            i++;
        }
    }
    else{
        file_path = "-1";
    }

    title = req.body.title;
    contents = req.body.contents;
    date = moment().format('YYYY-MM-DD HH:mm:ss');
    author = req.session.name;
 


    mysql.query('INSERT INTO entries.Programing_C (title,contents,path,date,author) VALUES (?,?,?,?,?)'
    ,[title,contents,file_path,date,author],
    function(error,result){
        if(error) console.log(error);
        else {
            upload(req,res,function(err){});
            res.send('<script type = "text/javascript">alert("글이 작성 되었습니다.."); document.location.href = "/"</script>');
        }
    });


};

function up(){
    return upload;
}
module.exports.write = write;
module.exports.up = up;
