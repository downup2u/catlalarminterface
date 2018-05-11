const config =  {
  listenport:process.env.listenport||3005,
  rooturl:process.env.rooturl || 'http://magicalcat.codemao.cn',
  issmsdebug:process.env.issmsdebug || false,

  publishdiradmin:'../../dist/admin',
  uploaddir:'../../dist/uploader',
  uploadurl:'/uploader',
  logdir:'../../dist/log',

  publicdir:'../../dist/public',
  publicurl:'/public',
    // ...
  mongodburl:process.env.MONGO_URL || `mongodb://tmcatuser:tmcat159@127.0.0.1/tmcat`,

};


module.exports = config;
