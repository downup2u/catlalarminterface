const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

mongoose.Promise = global.Promise;
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

exports.RealtimeAlarmHourSchema = RealtimeAlarmHourSchema;
exports.RealtimeAlarmHourKafkaSchema = RealtimeAlarmHourKafkaSchema;

exports.RealtimeAlarmHourModel = RealtimeAlarmHourModel;
exports.RealtimeAlarmHourKafkaModel = RealtimeAlarmHourKafkaModel;
