const startrouter = (app)=>{
  require('./test.js')(app);
  require('./sys.js')(app);
};


exports.startrouter = startrouter;
