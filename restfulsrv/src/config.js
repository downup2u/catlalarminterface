const config =  {
  listenport:process.env.listenport||3005,
  issmsdebug:process.env.issmsdebug || false,
  secretkey:'catltestrestful',
  // publishdiradmin:'../../dist/admin',
  // uploaddir:'../../dist/uploader',
  // uploadurl:'/uploader',
  // logdir:'../../dist/log',
  //
  // publicdir:'../../dist/public',
  // publicurl:'/public',
    // ...
  mongodburl:process.env.MONGO_URL || 'mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred',

};


module.exports = config;
