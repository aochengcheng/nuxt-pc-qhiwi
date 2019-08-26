// 滚动到顶部缓动实现
// rate表示缓动速率，默认是2
// top 目标位置 
export const backToTop = function (rate, target=0) {
  var doc = document.body.scrollTop ? document.body : document.documentElement;
  var scrollTop = doc.scrollTop;

  var top = function () {
    scrollTop = scrollTop + (target - scrollTop) / (rate || 2);
    // console.log(scrollTop)
    // 临界判断，终止动画
    if (scrollTop < target+1) {
      doc.scrollTop = target;
      return;
    }
    doc.scrollTop = scrollTop;
    // 动画gogogo!
    requestAnimationFrame(top);
  };
  top();
};
