var fs = require('fs');
var zlib = require('zlib');
var file = process.argv[2];
fs.readFile(file,function(error,buffer){
  zlib.gzip(buffer, function(error){
    fs.writeFile(file + '.gz',buffer,function(error){
      console.log('arquivo');
    });
  });
});
