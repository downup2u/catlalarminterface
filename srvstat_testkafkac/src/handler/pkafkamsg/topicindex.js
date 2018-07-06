const parseKafkaMsgs = require('../kafkadb_data.js');
const debug = require('debug')('srvstat_testkafkac:topicindex');

const processbatchmsgs = (msgs,callbackfnmsg)=>{
  debug(`消息开始----->`);
  parseKafkaMsgs(msgs,()=>{
    debug(`消息结束----->数据库操作结束-->`);
    callbackfnmsg();
  });
};

module.exports = processbatchmsgs;
