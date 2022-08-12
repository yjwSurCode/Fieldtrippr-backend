import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './app.css';

const App = () => {
    const socket = io.connect('http://localhost:3000');

    //Listen on new_message
    socket.on('new_message', (data) => {
        console.log('socket.on--new_message', data);

        setTyping('');

        setTextList([...textList, { user: data.username, message: data.message }]);

        // feedback.html('');
        // message.val('');
        // chatroom.append("<p class='message'>" + data.username + ': ' + data.message + '</p>');
    });

    const nameRef = useRef('');
    const messageRef = useRef('');
    const [typing, setTyping] = useState('');
    const [textList, setTextList] = useState([]);

    const handleSendButton = () => {
        console.log('handleSendButton', messageRef);
        socket.emit('new_message', { message: messageRef.current.value });
    };

    const handleChangeName = () => {
        socket.emit('change_username', { username: nameRef.current.value });
    };

    //Emit typing
    const handleOnChange = () => {
        console.log('consthandleOnChange');
        socket.emit('typing');
    };

    //Listen on typing
    socket.on('typing', (data) => {
        setTyping(`${data.username}is typing a message..`);
        // feedback.html('<p><i>' + data.username + ' is typing a message...' + '</i></p>');
    });

    useEffect(() => {
        // try {
        //     const response = await axios({
        //         method: 'get',
        //         url: 'http://localhost:3000/login',
        //         responseType: 'json',
        //     }).then(function (res) {
        //        console.log(res);
        //     });
        //       console.log(response,'response');
        // } catch (error) {
        //     console.error(error);
        // }

        try {
            const response = axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                responseType: 'json',
            }).then(function (res) {
                console.log(res);
            });
        } catch (error) {
            console.error(error);
        }
        console.log('app init');
    }, []);

    return (
        <>
            <header>
                <h1>Super Chat</h1>
            </header>
            <section>
                <div id="change_username">
                    <input ref={nameRef} id="username" type="text" />
                    <button onChange={handleChangeName} id="send_username" type="button">
                        Change username
                    </button>
                </div>
            </section>
            <section id="chatroom">
                <section id="feedback">{typing}</section>
                <p>聊天文字区</p>
                {textList.map((item, index) => {
                    return (
                        <div>
                            pppppppp
                            <div>{item.user}</div>
                            <div>{item.message}</div>
                        </div>
                    );
                })}
            </section>
            <section id="input_zone">
                <input
                    id="message"
                    ref={messageRef}
                    placeholder="请输入聊天信息"
                    onChange={handleOnChange}
                    class="vertical-align"
                    type="text"
                />
                <button onClick={handleSendButton} id="send_message" class="vertical-align" type="button">
                    Send
                </button>
            </section>
            ==============================
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
