# catlalarminterface
catlalarminterface

http://3005//apicatl/location/0

curl http://192.168.2.16:3005/apicatl/location/1719100251


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
