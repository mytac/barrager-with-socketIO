/**
 * Created by mytac on 2017/3/28.
 */
const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(80);

function handler (req, res) {
    fs.readFile(__dirname + '/test.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.emit('news', { text: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});