exports.convert=function(str){
	var arr=str.split(',');
	var obj={imei: arr[0],latitude: arr[1],longitude: arr[2],sent: new Date(arr[3], arr[4], arr[5], arr[6], arr[7], arr[8]),received: new Date(),corrected_latitude: arr[1],corrected_longitude: arr[2],speed: arr[9],direction: arr[10]};
	return obj;

}