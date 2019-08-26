export function UTCformat(t = '') {
    return t.split('T')[0].replace(/\-/g, '.')
}

export function goTime(start, end) {
    return Math.abs(Date.parse(UTCformat(end)) - Date.parse(UTCformat(start)))
}

// 2018年10月10日20:11:11 格式
export function ymdFormat(time) {
    let t = new Date(time)
    let y = t.getFullYear()
    let m = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth()

    let d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
    return `${y} 年 ${m} 月 ${d} 日`
}

export function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();

    var diffValue = now - new Date(dateTimeStamp).getTime();
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}