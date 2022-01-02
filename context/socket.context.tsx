import { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import React, { useState } from 'react';
import EVENTS from '../config/events';
interface Context {
  socket: Socket;
  userName?: string;
  setUserName: Function;
  roomId?: string;
  rooms: object;
  messages: { message: string; userName: string; time: string }[];
  setMessages?: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  socket.on(EVENTS.SERVER.ROOMS, data => {
    setRooms(data);
  });
  socket.on(EVENTS.SERVER.JOINED_ROOM, data => {
    setRoomId(data);
    setMessages([]);
  });
  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ userName, time, message }) => {
    setMessages([...messages, { userName, time, message }]);
  });
  return (
    <SocketContext.Provider
      value={{
        socket,
        userName,
        setUserName,
        roomId,
        rooms,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}
export const useSockets = () => useContext(SocketContext);
export default SocketsProvider;
