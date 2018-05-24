const config = require('../config.js');
const debug  = require('debug')('srvapp:index');
const mongoose     = require('mongoose');
const _ = require("lodash");
const moment = require('moment');
const jwt = require('jsonwebtoken');
const pwd = require('../util/pwd.js');
//设备
const Schema       = mongoose.Schema;
const DeviceSchema = new Schema({
}, { strict: false });
const DeviceModel =mongoose.model('device',  DeviceSchema);

//用户
const UserSchema = new Schema({
}, { strict: false });
const UserModel =mongoose.model('user',  UserSchema);

const middlewareauth = (req,res,next)=>{
  ////console.log("in middlewareauth");
  ////console.log("req.path:" + req.path);
  ////console.log("req.headers:" + JSON.stringify(req.headers));
    const token = req.headers['authorization'];
    if (!token) {
      res.sendStatus(401);
      res.end();
      ////console.log("no token===>");
    } else {
        try {
            let decodeduser = jwt.verify(token.replace('Bearer ', ''), config.secretkey);
            ////console.log("===>" + JSON.stringify(decodeduser));
            req.userid = decodeduser._id;
            next();
        } catch (e) {
            res.sendStatus(401);
            res.end();
            ////console.log("invalied token===>");
        }
    }

};



const loginuser = (actiondata,callback)=>{
  const oneUser = actiondata;
  const dbModel = UserModel;
  dbModel.findOne({ username: oneUser.username },{
    'passwordsalt':1,
    'passwordhash':1
  }).lean().exec((err, user)=> {
    if (!!err) {
      callback({
        loginsuccess:false,
        errmsg:err.message
      });
      return;
    }
    if (!user) {
      callback({
        loginsuccess:false,
        errmsg:'用户不存在'
      });
      return;
    }
    console.log(user);
    pwd.hashPassword(oneUser.password, user.passwordsalt, (err, passwordHash)=> {
      console.log(passwordHash);
      if(!err && !!passwordHash){
        if (passwordHash === user.passwordhash) {
          const loginuserexptime = 60*60*24;//24 hours
          const token =  jwt.sign({
                 exp: Math.floor(Date.now() / 1000) + loginuserexptime,
                 _id:user._id,
               },config.secretkey, {});
          callback({
            loginsuccess:true,
            token,
            expsec:loginuserexptime
          });
          return;
        }
      }
      callback({
        loginsuccess:false,
        errmsg:'用户名或密码错误'
      });
    });
  });
}
const startviews = (app)=>{
  //http://localhost:3005/apicatl/login
  app.post('/apicatl/login', (req, res)=> {
    const actiondata = req.body;
    debug(`/apicatl/login:${JSON.stringify(actiondata)}`);
    loginuser(actiondata,(resultjson)=>{
      res.status(200)
          .json(resultjson);
    });

	});

  app.get('/apicatl/location',middlewareauth,(req, res)=> {//middlewareauth,
    const DeviceId = req.query.DeviceId;
    const deviceModel = DeviceModel;
    deviceModel.findOne({DeviceId}).lean().exec((err,deviceinfo)=>{
      debug(err);
      debug(deviceinfo)
      if(!err && !!deviceinfo){
          res.status(200)
              .json({
                	"DeviceId": deviceinfo.DeviceId,
                	"GPSTime": _.get(deviceinfo,'LastHistoryTrack.GPSTime',''),
                	"Latitude": _.get(deviceinfo,'LastHistoryTrack.Latitude',0),
                	"Longitude": _.get(deviceinfo,'LastHistoryTrack.Longitude',0),
                	"UpdateTime": _.get(deviceinfo,'UpdateTime',''),
                  "DataTime": _.get(deviceinfo,'LastRealtimeAlarm.DataTime',''),
                });
      }
      else{
        res.sendStatus(404);
        res.end();
      }
    });
  });
  //   debug(`in /apicatl/location/:DeviceId`);
  //   res.status(200)
  //       .json({
  //         	"DeviceId": "1735200002",
  //         	"GPSTime": "2018-04-19 16:29:27",
  //         	"Latitude": 27.877929,
  //         	"Longitude": 112.905888,
  //         	"UpdateTime": "2018-04-19 16:34:45",
  //           "DataTime": "2018-04-19 16:29:43"
  //         });
	// });
};

module.exports= startviews;
