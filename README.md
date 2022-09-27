# Fieldtrippr-backend

rn-back-end

https://github1s.com/jeferson-sb/node-chat-app/blob/HEAD/src/presentation/server.js

# socket.io 事件速查表

io.on('connect', onConnect);

function onConnect(socket){

// 发送给当前客户端
socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

// 发送给所有客户端，除了发送者
socket.broadcast.emit('broadcast', 'hello friends!');

// 发送给同在 'game' 房间的所有客户端，除了发送者
socket.to('game').emit('nice game', "let's play a game");

// 发送给同在 'game1' 或 'game2' 房间的所有客户端，除了发送者
socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

// 发送给同在 'game' 房间的所有客户端，包括发送者
io.in('game').emit('big-announcement', 'the game will start soon');

// 发送给同在 'myNamespace' 命名空间下的所有客户端，包括发送者
io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

// 发送给指定 socketid 的客户端（私密消息）
socket.to(<socketid>).emit('hey', 'I just met you');

// 包含回执的消息
socket.emit('question', 'do you think so?', function (answer) {});

// 不压缩，直接发送
socket.compress(false).emit('uncompressed', "that's rough");

// 如果客户端还不能接收消息，那么消息可能丢失
socket.volatile.emit('maybe', 'do you really need it?');

// 发送给当前 node 实例下的所有客户端（在使用多个 node 实例的情况下）
io.local.emit('hi', 'my lovely babies');

};

注册接口：
role 0 为学生
role 1 为老师

编辑用户信息接口： /editUser

发送邮件接口：/send_gmail

{email：''}

忘记密码接口：/forgetPw {email：'' ,password:''}

更新用户信息接口:

editUser

{
email  必传
user_img:"头像"
about
skill
fancy
subjects
img_url
}

发送聊天接口  send_message

{
"params": {
"send_target": "11",
"role":"0",
"userName":"",
"create_time":"111",
"has_read": false,
"message": "messageRef.current.value"
}
}


obtain_teacherId  获取所有学生或者老师的信息
{
role:0   
}

获取聊天记录接口 obtain_message
{
user_id: '11'
}

判断

target_id: '22', 目标用户 userId

{
"params": {
"current_user_id": "11",
"target_id": "22"
}
}







22-9-26


commit 65d0724f18c30fe1b2d9da0b1ea3fbd0ad2a6c06
Author: Ye Huang <1010386305@qq.com>
Date:   Fri Aug 12 09:05:34 2022 +0100

    interface_optimized_return

  

git  checkout    405d908b8c1799b3c1ccd235e8be68327aafc6d0 (origin/yeye)

除开nodemodules  


