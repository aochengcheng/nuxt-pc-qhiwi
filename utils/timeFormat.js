export function UTCTimeForMat(UTCDateString, time) {
  // console.log(UTCDateString)
  if (!UTCDateString) {
    return '-';
  }

  function formatFunc(str) { //格式化显示
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(UTCDateString); //这步是关键

  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = date2.getHours();
  var noon = hour >= 12 ? 'PM' : 'AM';
  hour = hour >= 12 ? hour : hour;
  hour = formatFunc(hour);
  var min = formatFunc(date2.getMinutes());
  var dateStr = year + '-' + mon + '-' + day;

  if (time) {
    return year + '年' + mon + '月' + day + '日 ' + hour + ':' + min;
  }
  return dateStr;
}

export function getHours(start, end) {
  let s = new Date(start).getTime()
  let e = new Date(end).getTime()

  let hour = Math.floor((e - s) / 1000 / 60 / 60)
  return hour > 24 ? Math.ceil(hour / 24) + '天' : hour + '小时'
}


export function UTC(utc, time) {

  let date = new Date(utc)

  var y = date.getUTCFullYear();
  var m = date.getUTCMonth() + 1;
  var d = date.getUTCDate();


  var h = date.getUTCHours() + 8 > 10 ? date.getUTCHours() + 8 : '0' + (date.getUTCHours() + 8)

  var noon = h >= 12 ? '下午' : '上午'
  var M = date.getUTCMinutes() > 10 ? date.getUTCMinutes() : '0' + date.getUTCMinutes();
  var s = date.getUTCSeconds();
  var dateStr = `${y}-${m}-${d}`
  if (time == 'yy-mm-dd-noon') {
    return y + '年' + m + '月' + d + '日 ' + noon + h + ':' + M
  }

  if (time == 'mm-dd') {
    return m + '月' + d + '日'
  }
  return dateStr;
}
