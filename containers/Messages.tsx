import React, { useRef } from 'react';
import { useSockets } from '../context/socket.context';
import EVENTS from '../config/events';
import styles from '../styles/Messages.module.css';
function MessagesContainer() {
  const { socket, messages, roomId, userName, setMessages } = useSockets();

  const newMessageRef = useRef(null);
  const hanldeSendMessage = () => {
    const message = newMessageRef.current.value;
    if (!String(message).trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, userName });
    const date = new Date();
    setMessages([
      ...messages,
      {
        userName: 'You',
        message,
        time: `${date.getHours()}:${date.getMinutes()}}`,
      },
    ]);
    newMessageRef.current.value = '';
  };
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      hanldeSendMessage();
    }
  };
  if (!roomId) return <div></div>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map((message, index) => {
          return (
            <div key={index} className={styles.message}>
              <div className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {message.userName}-{message.time}
                </span>
                <span className={styles.messageBody}>{message.message} </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.messageBox}>
        <textarea
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
          rows={1}
          onKeyDown={handleKeyDown}
        />
        <button onClick={hanldeSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
