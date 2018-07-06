# catlalarminterface
catlalarminterface

http://3005//apicatl/location/0

curl http://192.168.2.16:3005/apicatl/location/1719100251


121.204.133.201	 

root@ecs-7063-0001:~# docker run -it confluentinc/cp-kafka:4.0.0 bash
kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup --describe


kafka-consumer-groups --bootstrap-server 192.168.2.11:9092  --group catlpushgroup  --topic pbmsindex --reset-offsets --to-latest --execute


kafka-console-consumer --bootstrap-server 192.168.2.11:9092 --topic CRM_ALARM_INFO_L1_TEST --offset 0 --partition 0 --max-messages 100

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




db.realtimealarmhourkafkas.count({"CurDayHour":{
  $in:['2018070201','2018070202','2018070203','2018070204','2018070205','2018070206','2018070207']
  }})

db.realtimealarmhourkafkas.count({"DataTime":{$gte:'2018-07-02 00:00:00',$lt:'2018-07-03 00:00:00'}})


db.realtimealarmhourkafkas.count({});
db.realtimealarmhours.count({});

db.realtimealarmhours.createIndex({'CurDayHour':1});
db.realtimealarmhours.createIndex({'id':1});

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
