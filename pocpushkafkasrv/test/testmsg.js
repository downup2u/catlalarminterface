const parseKafkaMsgs =  require('../src/handler/kafkadb_data');
const onHandleToDB = require('../src/handler/kafkadb_dbh.js');
const valuemsg =
{
	"Version": "1.0",
	"GUID": "8EE020E0-B16B-483F-9012-846C2473CBB8",
	"SN64": 33698066,
	"DeviceId": "1727210882",
	"DeviceType": 2,
	"DeviceStatus": 66560,
	"TroubleStatus": 0,
	"Temperature_PCB": 39.1,
	"Position": {
		"SN16": 2008,
		"FixStatus": 1,
		"GPSTime": "2018-05-24 01:47:47",
		"Longitude": 118.902361,
		"Latitude": 25.381965,
		"Speed": 55.0,
		"Course": 284,
		"Altitude": 31,
		"LAC": 22861,
		"CellId": 6061
	},
	"BMSData": {
		"CANType": 2,
		"SN16": 883,
		"DataTime": "2018-05-24 09:47:47",
		"RecvTime": "2018-05-24 09:56:56",
		"Alarm": {
			"AL_TROUBLE_CODE": 225,
			"AL_TROUBLE_CODE_2": [47, 49, 110,11,18,29]//, 49, 110

		},
		"BAT_U_OUT_HVS": 4553.5,
		"BAT_U_TOT_HVS": 517.4,
		"BAT_I_HVS": 11.4,
		"BAT_SOC_HVS": 48,
		"BAT_SOH_HVS": 100,
		"ALIV_ST_SW_HVS": 12,
		"ST_AC_SW_HVS": 1,
		"ST_AUX_SW_HVS": 0,
		"ST_MAIN_NEG_SW_HVS": 1,
		"ST_PRE_SW_HVS": 0,
		"ST_MAIN_POS_SW_HVS": 0,
		"ST_CHG_SW_HVS": 255,
		"ST_FAN_SW_HVS": 0,
		"ST_HEATER_SW_HVS": 0,
		"BAT_U_HVS": 518.0,
		"BAT_ALLOW_DISCHARGE_I": 480.0,
		"BAT_ALLOW_CHARGE_I": 450.0,
		"BAT_ISO_R_POS": 4275,
		"BAT_ISO_R_NEG": 4450,
		"BAT_UCELL_MAX": 3.3,
		"BAT_UCELL_MIN": 3.3,
		"BAT_UCELL_MAX_CSC": 2,
		"BAT_UCELL_MAX_CELL": 12,
		"BAT_UCELL_MIN_CSC": 1,
		"BAT_UCELL_MIN_CELL": 16,
		"BAT_T_MAX": 33,
		"BAT_T_MIN": 32,
		"BAT_T_AVG": 32,
		"BAT_T_MAX_CSC": 1,
		"BAT_T_MIN_CSC": 1,
		"BAT_USER_SOC_HVS": 48,
		"BAT_UCELL_AVG": 3.3,
		"KEYONVOLTAGE": 26.8,
		"POWERVOLTAGE": 27.0,
		"CHARGEACVOLTAGE": 0.0,
		"CHARGEDCVOLTAGE": 27.0,
		"CC2VOLTAGE": 4.8,
		"CHARGEDCAPACITY": 0,
		"TOTALWORKCYCLE": 3174.6,
		"CSC_POWER_CURRENT": 292,
		"BAT_MAX_SOC_HVS": 49,
		"BAT_MIN_SOC_HVS": 47,
		"BAT_WEI_SOC_HVS": 48,
		"BAT_CHG_AMPERREQ": 510.0,
		"BPM_24V_UOUT": 0.0,
		"ST_NEGHEATER_SW_HVS": 0,
		"ST_WIRELESSCHG_SW": 1,
		"ST_SPEARCHG_SW_2": 1,
		"ST_POWERGRIDCHG_SW": 1,
		"CC2VOLTAGE_2": 4.8
	}
};

//DEBUG=* logdir=/Users/wangxiaoqing/Downloads/work/catlalarminterface/pocpushkafkasrv/test MONGO_URL=mongodb://bms.com28.cn:27018/bmscatl node test/index
const testmsg = ()=>{
	const msgkafka = [
		{
			partition:0,
			offset:0,
			value:JSON.stringify(valuemsg)
		}
	];
	parseKafkaMsgs(msgkafka,(resultmsglist)=>{
		console.log(`-->${JSON.stringify(resultmsglist)}`)
		onHandleToDB(resultmsglist,(err,allresult)=>{
			console.log(`-->${JSON.stringify(allresult)}`)
		});
	});
}

// -->{"alarm":[{"$set":{"CurDayHour":"201804272246","DeviceId":"1641102346","DataTime":"2018-04-27 22:46:58","warninglevel":"","NodeID":1,"SN64":16102,"UpdateTime":"2018-05-23 14:38:22"},"$inc":{"AL_Under_Ucell":1,"AL_Under_SOC":1,"AL_dV_Ucell":1,"AL_Err_Bal_Circuit":1,"AL_Trouble_Code":1,"AL_Trouble_Code_2":1},"$addToSet":{"TROUBLE_CODE_LIST":{"$each":[]}}}]}


module.exports = testmsg;
