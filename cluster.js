var os = require('os');
var cluster = require('cluster');

const cpus = os.cpus();

if(cluster.isMaster){
  cpus.forEach(function(){cluster.fork();});
  cluster.on('listening',function(worker){
      console.log('novo nó:' + worker.process.pid);
  });
  cluster.on('exit',function(worker){
      console.log('rework')
      cluster.fork();
    });
}else{
  require('./index.js');
}
