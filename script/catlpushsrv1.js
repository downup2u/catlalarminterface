module.exports = {
  apps : [
    {
      name: "catlpushsrv1",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"1",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv2",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
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
    },
    {
      name: "catlpushsrv3",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"3",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv4",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"4",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv5",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"5",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv6",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"6",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv7",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"7",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv8",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"8",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv9",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"9",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },
    {
      name: "catlpushsrv10",
      script: "/root/catlalarminterface/index.js",
      exec_mode:"fork_mode",
      env: {
        "NODE_ENV": "production",
        "DEBUG":"srv:*",
        "DEBUG_COLORS":"1",
        "NodeID":"10",
        "MONGO_URL":"mongodb://192.168.2.17:27007,192.168.2.18:27007/bmscatl?readPreference=secondaryPreferred",
        "mongos":"true",
        "GroupId":"catlpushgroup",
        "logdir":"/root/catlalarminterface/log",
        "KAFKA_HOST_P":"192.168.2.11:9092,192.168.2.12:9092,192.168.2.13:9092"
      }
    },

  ]
}
