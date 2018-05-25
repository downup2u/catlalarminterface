const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
// const config = require('../config.js');
// const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
const SystemConfigSchema = new Schema({
  organizationid:{ type: Schema.Types.ObjectId, ref: 'organization' },
}, { strict: false });
SystemConfigSchema.plugin(mongoosePaginate);
const SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);

//设备
const DeviceSchema = new Schema({
}, { strict: false });
DeviceSchema.plugin(mongoosePaginate);
const DeviceModel =mongoose.model('device',  DeviceSchema);

//设备分组
const DeviceGroupSchema = new Schema({
  name:String,
  memo:String,
  contact:String,
  deviceids:[{ type: Schema.Types.ObjectId, ref: 'device', default: [] }],
  organizationid:{ type: Schema.Types.ObjectId, ref: 'organization' },
  systemflag:{ type: Schema.Types.Number,default: 0 },
});
DeviceGroupSchema.plugin(mongoosePaginate);
const DeviceGroupModel =mongoose.model('devicegroup',  DeviceGroupSchema);

//用户
const UserSchema = new Schema({
  username:String,
  passwordhash: String,
  passwordsalt: String,
  truename:String,
  memo:String,
  created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  updated_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  organizationid:{ type: Schema.Types.ObjectId, ref: 'organization' },
  roleid:{ type: Schema.Types.ObjectId, ref: 'role' },
  adminflag:{ type: Schema.Types.Number,default: 0 },
  devicegroups:[{ type: Schema.Types.ObjectId, ref: 'devicegroup', default: [] }],
  devicecollections:[],
  alarmsettings:{
    warninglevel:String,//报警等级
    subscriberdeviceids:[],//订阅的设备
  }
});
UserSchema.plugin(mongoosePaginate);
const UserModel =mongoose.model('user',  UserSchema);


//实时告警信息[按天]
const RealtimeAlarmHourSchema= new Schema({
}, { strict: false });
RealtimeAlarmHourSchema.plugin(mongoosePaginate);
const RealtimeAlarmHourModel =mongoose.model('realtimealarmhour',  RealtimeAlarmHourSchema);

//实时告警信息[按天->Kafka记录]
const RealtimeAlarmHourKafkaSchema= new Schema({
}, { strict: false });
RealtimeAlarmHourKafkaSchema.plugin(mongoosePaginate);
const RealtimeAlarmHourKafkaModel =mongoose.model('realtimealarmhourkafka',  RealtimeAlarmHourKafkaSchema);

//登录日志
const UserLogSchema = new Schema({
    username:String,
    organizationid:{ type: Schema.Types.ObjectId, ref: 'organization' },
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    creator:{ type: Schema.Types.ObjectId, ref: 'user' },
    type:{type:String,default:'login'}
});
UserLogSchema.plugin(mongoosePaginate);
const UserLogModel =mongoose.model('userlog',  UserLogSchema);

//数据字典
const DataDictSchema = new Schema({
  organizationid:{ type: Schema.Types.ObjectId, ref: 'organization' },
  name:{type:String},//字段名
  fullname:{type:String},//字段全名
  showname:{type:String},//字段显示名
  type:{type:String},//字段类型
  desc:{type:String},//字段描述
  unit:{type:String},//字段单位
});
DataDictSchema.plugin(mongoosePaginate);
const DataDictModel =mongoose.model('datadict',  DataDictSchema);


//设备城市映射表【每天一次】
const DeviceCitySchema = new Schema({
  deviceid:{ type: Schema.Types.ObjectId, ref: 'device'},
  updatetime: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
}, { strict: false });
DeviceCitySchema.plugin(mongoosePaginate);
const DeviceCityModel =mongoose.model('devicecity',  DeviceCitySchema);


exports.SystemConfigSchema = SystemConfigSchema;
exports.DeviceSchema = DeviceSchema;
exports.DeviceGroupSchema = DeviceGroupSchema;
exports.RealtimeAlarmHourSchema = RealtimeAlarmHourSchema;
exports.UserLogSchema = UserLogSchema;
exports.DataDictSchema = DataDictSchema;
exports.DeviceCitySchema = DeviceCitySchema;
exports.RealtimeAlarmHourKafkaSchema = RealtimeAlarmHourKafkaSchema;

exports.SystemConfigModel = SystemConfigModel;
exports.DeviceModel = DeviceModel;
exports.DeviceGroupModel = DeviceGroupModel;
exports.RealtimeAlarmHourModel = RealtimeAlarmHourModel;
exports.UserLogModel = UserLogModel;
exports.DataDictModel = DataDictModel;
exports.DeviceCityModel = DeviceCityModel;
exports.RealtimeAlarmHourKafkaModel = RealtimeAlarmHourKafkaModel;
