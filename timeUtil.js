// https://gitee.com/dotton/CountDown/blob/master/pages/count/count.js
export default {
    // 位数不足补零
    fill_zero_prefix(num) {
        return num < 10 ? "0" + num : num
    },
    // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
    date_format(micro_second) {
        // 秒数
        var second = Math.floor(micro_second / 1000);
        // 小时位
        var hr = this.fill_zero_prefix(Math.floor(second / 3600));
        // 分钟位
        var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
        // 秒位
        var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
        // 毫秒位，保留2位
        // var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

        return hr + ":" + min + ":" + sec;
    },
}