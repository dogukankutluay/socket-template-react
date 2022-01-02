import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSockets } from '../context/socket.context';
import { MessagesContainer, RoomsContainer } from '../containers';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { socket, userName, setUserName } = useSockets();

  const usernameref = useRef(null);
  const handleSetUserName = () => {
    const value = usernameref.current.value;
    if (!value) return;
    setUserName(value);
    localStorage.setItem('userName', value);
  };
  useEffect(() => {
    if (usernameref)
      usernameref.current.value = localStorage.getItem('userName') || '';
  }, []);

  return (
    <div>
      {!userName ? (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input ref={usernameref} type="text" placeholder="User Name" />
            <button onClick={handleSetUserName}>Start</button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
