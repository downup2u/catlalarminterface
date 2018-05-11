const config = require('../config.js');
const debug  = require('debug')('srvapp:index');

const startviews = (app)=>{

  app.post('/apicatl/login', (req, res)=> {
    debug(`/apicatl/login`);
    res.status(200)
        .json({
        	loginsuccess:true,
        	token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjgwMDI0NTUsIl9pZCI6IjVhY2RhMmViMzAzMmJjMjljMjFhOTEwZCIsImlhdCI6MTUyNTQxMDQ1NX0.ax5ChEGGbLQATSeXi7Zm1gBVsv3TefCuaPYuDGzbnmA'
        });
	});

  app.get('/apicatl/location/:DeviceId', (req, res)=> {
    debug(`in /apicatl/location/:DeviceId`);
    res.status(200)
        .json({
          	"DeviceId": "1735200002",
          	"GPSTime": "2018-04-19 16:29:27",
          	"Latitude": 27.877929,
          	"Longitude": 112.905888,
          	"UpdateTime": "2018-04-19 16:34:45",
            "DataTime": "2018-04-19 16:29:43"
          });
	});
};

module.exports= startviews;
