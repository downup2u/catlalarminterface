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

#进数据库
docker run -it mongo:3.4 bash
mongo --host 192.168.2.16
use bmskafka

db.realtimealarmhourkafkas.count({});
db.realtimealarmhours.count({});

db.realtimealarmhours.createIndex({'CurDayHour':1});
db.realtimealarmhours.createIndex({'id':1});

db.realtimealarmhourkafkas.findOne({});

pm2 stop 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
