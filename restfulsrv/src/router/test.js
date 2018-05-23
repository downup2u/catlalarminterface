const config = require('../config.js');
const debug  = require('debug')('srvapp:index');
const mongoose     = require('mongoose');
const _ = require("lodash");
const jwt = require('jsonwebtoken');
//设备
const Schema       = mongoose.Schema;
const DeviceSchema = new Schema({
}, { strict: false });
const DeviceModel =mongoose.model('device',  DeviceSchema);

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
const startviews = (app)=>{

  app.post('/apicatl/login', (req, res)=> {
    debug(`/apicatl/login`);
    res.status(200)
        .json({
        	loginsuccess:true,
        	token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjgwMDI0NTUsIl9pZCI6IjVhY2RhMmViMzAzMmJjMjljMjFhOTEwZCIsImlhdCI6MTUyNTQxMDQ1NX0.ax5ChEGGbLQATSeXi7Zm1gBVsv3TefCuaPYuDGzbnmA'
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
