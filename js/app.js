
/*构建http服务*/
var app = require('http').createServer();
/*引入socket.io*/
var io = require('socket.io')(app);
//端口
var PORT = 8081;
/*监听端口*/
app.listen(PORT);
//用户名
var users = []; 

io.on('connection',function(socket){

    var isNew = true;

    socket.on('login',function(data) {

        for (let name of users) {
            if (users.username == data.username) {
                isNew = false; 
                break;
            }
        }

        if (isNew) {
            users.push({
                "username": data.username,
            });
            socket.emit('loginSuccess',data);
            io.sockets.emit('add',data);

        } else {
            socket.emit('loginFail',data);
        }
         
    })
    

    socket.on('sendMsg',function(data) {
        io.sockets.emit('receiveMsg',data); 
    })
})

console.log('app listen at'+PORT);