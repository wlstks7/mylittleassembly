/**
 * Created by Artem M.
 * Date: 27.02.16
 * Email: frost.artem@gmail.com
 */

var express = require('express');
var socket = require('socket.io');

var app = express();

app.set('views', __dirname+'/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname+'/public'));

var io = socket.listen(app.listen(8080));


app.get('/', function(req, res){
    res.render('home', {'title':'Home Node JS'});
    res.end();
});

io.sockets.on('connection', function(client){

    client.on('setName', function(data){
        if(!client.name){
            client.name = data.name;
            client.emit('message', {'data': 'Say hello: '+client.name});
            client.broadcast.emit('message', {'data': 'Say hello to: '+client.name});
        }else{
            if(client.name == data.name){
                client.emit('message', {'data':'Your new name the same as old'});
            }else{
                var response = client.name+'change his name to : '+data.name;
                client.emit('message', {'data': 'You change the name to: '+client.name});
                client.broadcast.emit('message', {'data': client.name+'change his name to: '+data.name});
                client.name = data.name;
            }
        }
    });

    client.on('newMessage', function(data){
        client.emit('message', {'data':data.message});
        client.broadcast.emit('message', {'data': client.name+': '+data.message});
    });


});