import timeUtil from "./timeUtil"
// refer to: https://github.com/baqihg/wxTimer
var wxTimer = function (initObj) {
	initObj = initObj || {};
	this.complete = initObj.complete; //结束任务
	this.name = initObj.name; //当前计时器在计时器数组对象中的名字
	this.endTime = initObj.endTime; //结束时间
	this.intervarID; //计时ID
}

wxTimer.prototype = {
	//开始
	start: function (self) {
		let that = this;
		//开始倒计时
		function begin() {
			let remainMilliseconds = new Date(that.endTime).getTime() - new Date().getTime();
			if (remainMilliseconds < 0) {
				remainMilliseconds = 0
			}
			let tmpTimeStr = timeUtil.date_format(remainMilliseconds);
			let wxTimerSecond = (remainMilliseconds) / 1000;
			let wxTimerList = self.data.wxTimerList;

			//更新计时器数组
			wxTimerList[that.name] = {
				wxTimer: tmpTimeStr,
				wxTimerSecond: wxTimerSecond,
			}

			self.setData({
				wxTimer: tmpTimeStr,
				wxTimerSecond: wxTimerSecond,
				wxTimerList: wxTimerList
			});
			//结束执行函数
			if (wxTimerSecond <= 0) {
				if (that.complete) {
					that.complete();
				}
				that.stop();
			}
		}
		begin();
		this.intervarID = setInterval(begin, 1000);
	},
	//结束
	stop: function () {
		clearInterval(this.intervarID);
	},
}

module.exports = wxTimer;