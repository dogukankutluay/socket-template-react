import React, { useRef } from 'react';
import { useSockets } from '../context/socket.context';
import EVENTS from '../config/events';
import styles from '../styles/Room.module.css';
function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);
  const handleCreateRoom = () => {
    const roomName = newRoomRef.current.value;
    if (!String(roomName).trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    newRoomRef.current.value = '';
  };
  const handleJoinRoom = key => {
    if (key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  };
  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input type="Room name" ref={newRoomRef} />
        <button className="cta" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
      <ul className={styles.roomList}>
        {Object.keys(rooms).map(room => {
          return (
            <div key={room}>
              <button
                disabled={room === roomId}
                title={`Join ${rooms[room].name}`}
                onClick={() => handleJoinRoom(room)}>
                {rooms[room].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
