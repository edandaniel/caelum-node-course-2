var	fs	=	require('fs');
var zlib = require('zlib');
var upload = module.exports = function (app) {
  app.post('/upload/gzip',function(req,res){
    var versao = req.query.versao;
    console.log(versao);
    if(versao !== 'v1'){
      res.status(400).json({msg:'versao invalida!'});
      return;
    }
    
    var file  = req.headers.filename;
    req.pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream("files/"	+ file))
      //.pipe(console.log(''))
      //.on('data',function(){})
      .on('finish',function(){
        console.log('ok');
        res.writeHead(201,	{'Content-type':	'text/plain'});
        res.end('ok');
       });
  });
};
