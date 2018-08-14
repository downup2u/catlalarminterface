# catlalarminterface
catlalarminterface

http://3005//apicatl/location/0

curl http://192.168.2.16:3005/apicatl/location/1719100251

curl http://192.168.2.16:3005/apisys/getDataDict
curl http://192.168.2.16:3005/apisys/getDeviceCities
curl http://192.168.2.16:3005/apisys/getSystemconfig

121.204.133.201	 
----------
D03 192.168.2.16 121.204.132.39<<---%c?D:8Bm

it
docker run -it confluentinc/cp-kafka:4.0.0 bash

kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgrouptest --describe
kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgrouptest  --topic pbmsindex --reset-offsets --to-latest --execute


kafka-consumer-groups --bootstrap-server 172.26.175.131:9092  --group catlpushalarmgrouptest --describe
kafka-consumer-groups --bootstrap-server 172.26.175.131:9092  --group catlpushalarmgrouptest --describe



----------
root@ecs-7063-0001:~# docker run -it confluentinc/cp-kafka:4.0.0 bash
kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup --describe


kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup  --topic pbmsindex --reset-offsets --to-latest --execute


kafka-console-consumer --bootstrap-server 192.168.2.11:9092 --topic CRM_ALARM_INFO_L1 --offset 0 --partition 0 --max-messages 100

=============
kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group pbmsgid --describe

NodeID='1' pm2 start index.js
NodeID='2' pm2 start index.js
NodeID='3' pm2 start index.js
NodeID='4' pm2 start index.js

pm2 restart 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20

D03 192.168.2.16 121.204.132.39<<---%c?D:8Bm
#进数据库
docker run -v /root:/root -it mongo:3.4 bash
mongo --host 192.168.2.16
use bmskafka

db.realtimealarmhourkafkas.findOne();
db.realtimealarmhours.count({"id":"20180608161725103601"});
db.realtimealarmhourkafkas.count({"idsend":"20180608161725103601"});

db.realtimealarmhourkafkas.find({"idsend":"20180706141815200281"});

//topic
db.realtimealarmhours.count({ "CurDayHour" : "2018081414"})
db.realtimealarmhourkafkas.count({ "CurDayHour" : "2018081414"})

db.realtimealarmhours.findOne({ "CurDayHour" : "2018081414"})

db.realtimealarmhourkafkas.count(CurDayHour:{
    '$lte':"2018081114",
  });

  db.realtimealarmhourkafkas.remove(CurDayHour:{
      '$lte':"2018081114",
    });
//检查 realtimealarmhourkafkas & kafkas 个数是否匹配
db.realtimealarmhourkafkas.count({
  "DataTime":{$gte:'2018-07-09 10:00:00',$lt:'2018-07-10 10:00:00'}
});
db.kafkas.count({
  "DataTime":{$gte:'2018-07-09 10:00:00',$lt:'2018-07-10 10:00:00'},
  "key":{$exists:true},
});

db.kafkas.aggregate(
   [
     { $group : { _id : "$idsend", count: { $sum: "$idsend" } } },
     { $sort :{count:-1}}
   ]
)

db.kafkas.createIndex({DataTime:1})




db.realtimealarmhours.count({
  "isPushed":false,
  "DataTime":{$gte:'2018-07-08 02:00:00',$lt:'2018-07-08 03:00:00'},
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});


db.realtimealarmhours.count({
  "CurDayHour" : "2018070807",
  warninglevel:{$gt:0},
});
//--------
db.realtimealarmhours.count({
  "CurDayHour" : "2018070808",
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});

============
db.kafkas.count({
  "CurDayHour" : "2018071216"
});
db.realtimealarmhourkafkas.count({
  "CurDayHour" : "2018071216",
  "key":{$exists:true},
});

db.realtimealarmhourkafkas.findOne({
  "CurDayHour" : "2018071216",
});



============
//检查 realtimealarmhourkafkas & kafkas 个数是否匹配
db.realtimealarmhourkafkas.count({
  "CurDayHour" : "2018070814"
});
db.kafkas.count({
  "CurDayHour" : "2018070814"
});
db.realtimealarmhours.count({
  "CurDayHour" : "2018070814",
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});
db.realtimealarmhourkafkas.count({
  "CurDayHour" : "2018070814",
  topic:{$exists:true},
});


db.realtimealarmhourkafkas.findOne({
  "CurDayHour" : "2018070810",
  topic:{$exists:false},
});
db.realtimealarmhourkafkas.find({
  "idsend" : "20180708101627100397",
});

//============
db.realtimealarmhourkafkas.find({
  "CurDayHour" : "2018070808"
},{DeviceId:1,"CurDayHour" :1}).sort({DeviceId:1});

db.kafkas.find({
  "CurDayHour" : "2018070808"
},{DeviceId:1,"CurDayHour" :1}).sort({DeviceId:1});





db.realtimealarmhourkafkas.count({
  "CurDayHour" : "2018070808"
},{DeviceId:1,"CurDayHour" :1}).sort({DeviceId:1});

db.kafkas.count({
  "CurDayHour" : "2018070808"
},{DeviceId:1,"CurDayHour" :1}).sort({DeviceId:1});


db.realtimealarmhours.find({
  "CurDayHour" : "2018081414",
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
},{DeviceId:1}).sort({DeviceId:1});

<!-- {
	"_id": ObjectId("5b4111e59fe7c36d95bdb9c3"),
	"id": "20180708031632100540",
	"GPSTime": "2018-07-08 04:05:19",
	"Latitude": 43.819234,
	"Longitude": 125.258708,
	"UpdateTime": "2018-07-08 04:10:30",
	"SN64": 62536374,
	"warninglevel": 0,
	"DataTime": "2018-07-08 03:59:41",
	"DeviceId": "1632100540",
	"CurDayHour": "2018070803",
	"iorder": 2,
	"AL_TROUBLE_CODE_51_140": 33,
	"F[140]": 33,
	"cityname": "吉林省长春市",
	"adcode": "220100",
	"citycode": "0431",
	"NodeID": "8",
	"isPushed": true,
	"FirstAlarmTime": "2018-07-08 03:04:41",
	"__v": 0,
	"Details": [{
		"warninglevel": 2,
		"errorcode": "93",
		"description": "均衡回路短路",
		"id": "AL_TROUBLE_CODE_51_93"
	}],
	"AL_TROUBLE_CODE_51_166": 34,
	"F[166]": 34,
	"AL_TROUBLE_CODE_51_80": 38,
	"F[80]": 38,
	"AL_TROUBLE_CODE_51_93": 9,
	"F[93]": 9,
	"AL_TROUBLE_CODE_51_208": 1,
	"F[208]": 1
} -->

db.realtimealarmhours.find({
  "CurDayHour" : "2018070803",
  'DeviceId':"1632100540",
});
1632100540
1632101055

db.realtimealarmhourkafkas.count({
  "CurDayHour" : "2018070803",
  topic:{$exists:true},
});


db.realtimealarmhours.count({
  "isPushed":false,
  "CurDayHour" : "2018070802",
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});


//=======


db.realtimealarmhourkafkas.count({
  "DataTime":{$gte:'2018-07-07 00:00:00',$lt:'2018-07-07 06:00:00'}
});

db.realtimealarmhourkafkas.count({
  "topic":{$exists:false},
  "DataTime":{$gte:'2018-07-07 22:00:00',$lt:'2018-07-08 06:00:00'}
});

db.realtimealarmhourkafkas.find({
  "topic":{$exists:false},
  "DataTime":{$gte:'2018-07-07 22:00:00',$lt:'2018-07-08 06:00:00'}
},{idsend:1}).sort({idsend:1});

db.realtimealarmhours.find({
  "isPushed":false,
  "DataTime":{$gte:'2018-07-07 22:00:00',$lt:'2018-07-08 06:00:00'}
},{id:1}).sort({id:1});

db.realtimealarmhours.count({
  "isPushed":false,
  "DataTime":{$gte:'2018-07-07 22:00:00',$lt:'2018-07-08 06:00:00'},
  isPushed:false,
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});

db.realtimealarmhours.find({
  "isPushed":true,
  "DataTime":{$gte:'2018-07-08 03:00:00',$lt:'2018-07-08 06:00:00'},
  warninglevel:{$gt:0},
  'Details':{$exists:true},
  $where:'this.Details.length>0'
});

db.kafkas.count({
  "DataTime":{$gte:'2018-07-07 00:00:00',$lt:'2018-07-07 06:00:00'}
});


db.realtimealarmhourkafkas.count({"CurDayHour":{
  $in:['2018070201','2018070202','2018070203','2018070204','2018070205','2018070206','2018070207']
  }})

db.realtimealarmhourkafkas.count({"DataTime":{$gte:'2018-07-09 05:00:00',$lt:'2018-07-09 09:00:00'}})
db.kafkas.count({"DataTime":{$gte:'2018-07-09 05:00:00',$lt:'2018-07-09 09:00:00'}})



kafkas
realtimealarmhourkafkas
realtimealarmhours

db.realtimealarmhourkafkas.count({'CurDayHour':"2018070908",topic:{$exists:true}});


db.realtimealarmhours.count({'CurDayHour':"2018070908"});

db.realtimealarmhourkafkas.count({'CurDayHour':"2018070908"});
db.kafkas.count({'CurDayHour':"2018070908"});


db.realtimealarmhours.createIndex({'CurDayHour':1});
db.realtimealarmhours.createIndex({'id':1});
db.realtimealarmhourkafkas.createIndex({'idsend':1});
db.realtimealarmhourkafkas.findOne({});

pm2 stop 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19

==============================
#进数据库
docker run -v /root/dbexport0706:/root/dbexport0706 -it mongo:3.4 bash
cd /root/dbexport0706
mongoexport --host=192.168.2.16 --port 27017 --db bmskafka --collection realtimealarmhourkafkas --out ./realtimealarmhourkafkas.json --jsonArray --pretty  --query='{"DataTime":{$gte:"2018-07-02 00:00:00",$lt:"2018-07-03 00:00:00"}}' --sort='{ "DataTime" :1}'

csv
mongoexport --host=192.168.2.16 --port 27017 --db bmskafka --collection realtimealarmhourkafkas --out ./realtimealarmhourkafkas.csv --type=csv --fields=_id,DeviceId,CurDayHour,Longitude,Latitude,citycode,adcode,FirstAlarmTime,DataTime,warninglevel,Alarm,idsend,NodeID,create_at --query='{"DataTime":{$gte:"2018-07-05 21:00:00",$lt:"2018-07-06 09:00:00"}}' --sort='{ "idsend" :1}'

mongoexport --host=192.168.2.16 --port 27017 --db bmskafka --collection realtimealarmhourkafkas --out ./idsend.csv --type=csv --fields=idsend --query='{"DataTime":{$gte:"2018-07-05 21:00:00",$lt:"2018-07-06 09:00:00"}}' --sort='{ "idsend" :1}'


{ "_id" : ObjectId("5b1a47e8e6f83857531b4fd7"), "DeviceId" : "1719102404", "CurDayHour" : "2018060816", "Latitude" : 45.50529, "Longitude" : 119.642398, "citycode" : "0475", "adcode" : "150500", "FirstAlarmTime" : "2018-06-08 16:00:02", "DataTime" : "2018-06-08 16:59:32", "warninglevel" : 3, "Alarm" : { "Details" : [ { "count" : 23, "id" : "AL_TROUBLE_CODE_51_46", "description" : "支路内SOC差值过大报警三级", "errorcode" : "46", "warninglevel" : 3 } ] }, "idsend" : "20180608161719102404", "NodeID" : "12", "create_at" : "2018-06-08 17:10:00", "__v" : 0 }
