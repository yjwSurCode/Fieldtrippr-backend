import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Serivce } from '../client/axios';
// import { NATIVE_BRIDGE } from './native-platform';
let Svc = new Serivce();
import './app.css';

const App = () => {
    const socket = io.connect('http://localhost:3030');
    //Listen on new_message
    socket.on('new_message', (data) => {
        // console.log('socket.on--new_message', data);
        setTyping('');
        setTextList([...textList, { user: data.username, message: data.message }]);
    });
    //Listen on typing
    socket.on('typing', (data) => {
        setTyping(`${data.username}is typing a message..`);
    });

    const nameRef = useRef('');
    const messageRef = useRef('');
    const [typing, setTyping] = useState('');
    const [textList, setTextList] = useState([]);

    const [reviceUserList, setReviceUserList] = useState([{ name: '用户1' }, { name: '用户2' }, { name: '用户3' }]);

    const handleSendButton = () => {
        console.log('handleSendButton', messageRef);
        socket.emit('new_message', { message: messageRef.current.value });

        /** 保存聊天记录 */
        let params = {
            send_target: '11',
            receive_target: '22',
            create_time: new Date().getTime(),
            has_read: false,
            message: messageRef.current.value,
        };

        console.log('params-----', params, new Date(params.create_time));

        Svc.saveMessage(params);
    };

    //Emit change_username
    const handleChangeName = () => {
        socket.emit('change_username', { username: nameRef.current.value });
    };

    //Emit typing
    const handleOnChange = () => {
        console.log('handleOnChange');
        socket.emit('typing');
    };

    useEffect(() => {
        // console.log('app-init', NATIVE_BRIDGE);
    }, []);

    const Header = () => {
        return (
            <div>
                <div>添加</div>
                {reviceUserList.map((d) => {
                    return <div></div>;
                })}
                <div>用户1</div>
                <div>用户2</div>
                <div>用户3</div>
            </div>
        );
    };

    const NewMessage = () => {
        return <div>最新消息12</div>;
    };

    const MessageRegion = () => {
        return <div>最新消息12</div>;
    };

    const Chat = () => {
        return (
            <div>
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
            </div>
        );
    };

    return (
        <>
            <Header></Header>
            <NewMessage></NewMessage>
            <MessageRegion></MessageRegion>
            <Chat></Chat>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
