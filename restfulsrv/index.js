const srvhttp = require('./src/srvhttp.js');
const config = require('./src/config');
const mongoose     = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    mongos:config.mongos,

    useMongoClient: true,
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });

const token =  jwt.sign({
         exp: Math.floor(Date.now() / 1000) + 100000,
         _id:'599b87d9f63f591defcf5f70',
       },config.secretkey, {});
console.log(`token:\n${token}`);
srvhttp.startsrv();
