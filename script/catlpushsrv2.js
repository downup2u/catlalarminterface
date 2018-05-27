module.exports = {
  apps : [
      {
        name: "catlpushsrv2",
        script: "/root/catlalarminterface/index.js",
        env: {
          "NODE_ENV": "production",
          "DEBUG":"srv:*",
          "DEBUG_COLORS":"1",
          "NodeID":"2",
          "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
          "mongos":"true",
          "GroupId":"catlpushgroup",
          "logdir":"/root/catlalarminterface/log",
          "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
        }
      }
  ]
}
