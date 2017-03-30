/**
 * Created by mytac on 2017/3/29.
 */
const socket = io('http://localhost:3000');
 //每条弹幕发送间隔
 const looper_time = 3000/*3 * 1000*/;
 //是否首次执行
 let run_once = true;
 let mockData =
 {
 'img': 'http://localhost:3000/img/cute.png', //图片
 'href': '', //链接
 'close': true, //显示关闭按钮
 'speed': 8, //延迟,单位秒,默认8
 'color': '#ffffff', //颜色,默认白色
 'old_ie_color': '#ffffff', //ie低版兼容色,不能与网页背景相同,默认黑色
 }
 let fetchInput = (msg) =>{
 mockData['info']=msg
 return mockData
 }
 let do_barrager = (data) => {
 if (run_once) {
 //如果是首次执行,则设置一个定时器,并且把首次执行置为false
 looper = setInterval(do_barrager, looper_time);
 run_once = false;
 }
 //获取
 //是否有数据
 if (data) {
 $('body').barrager(data);
 }
 }

socket.on('connecting', function (data) {
    $('body').append(data)
    socket.emit('connected', { userId: '343546464' });
});
 //main
 $('#btn').on('click',()=>{
     socket.emit('chat message', $('#send').val());
     $('#send').val('');
     return false;
 })
socket.on('chat message', function(msg){
    do_barrager(fetchInput(msg))
    $('#message').text(msg);
});

