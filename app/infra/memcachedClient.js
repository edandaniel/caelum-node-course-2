var memcached = require('memcached');

function createMencachedClient(){
  var client = new memcached('localhost:11211',
  {
    retries:   10,
    retry  : 1000,
    remove : true
  });
  return client;
};

module.exports = function(){
  return createMencachedClient;
};
