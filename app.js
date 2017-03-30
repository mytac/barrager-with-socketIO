/**
 * Created by mytac on 2017/3/29.
 */
const express = require('express')
let app = express()
app.use(express.static('static'))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/test.html');
});
const server = app.listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`listening on http://${host}:${port}`)
})
const io = require('socket.io')(server);


io.on('connection', function (socket) {
    socket.emit('connecting', 'you are in...');
    socket.on('connected', function (data) {
        console.log(data);
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});