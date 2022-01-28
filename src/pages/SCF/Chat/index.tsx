import React, { useEffect, useState } from 'react';
import { Container, Body, ContainerChat, Contact, ContactInformation, Contacts, Menssagens, ItemMessage } from './styles';
import SideBar from '../../../components/SideBar';

import callCenterApi from '../../../services/callCenterApi';

import NotChatOpen from '../../../components/NotChatOpen';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiInfo } from 'react-icons/fi';

interface IntefaceActiveChat {
  chatId?: number
  idPhone?: string
}

interface InterfaceMessageByContact {
  id: number
  msg: string
  me: boolean
  created_at?: string
}

interface InterfaceMessageWithContact{
  id: number
  name: string
  msg: string
  id_phone: string
  seen?: boolean
}

const Chat: React.FC = () => {
  const { signOut } = useAuth();

  const [chatList, setChatList] = useState<InterfaceMessageWithContact[]>([]);
  const [messageByContact, setMessageByContact] = useState<InterfaceMessageByContact[]>([]);
  const [activeChat, setActiveChat] = useState<IntefaceActiveChat>({});
  const [msgToSend, setMsgToSend] = useState('')

  useEffect(() => {
    promiseLoadingContacts();
  }, []);

  let promiseLoadingContacts = () => {
    try {
      callCenterApi.get('/message').then(response => {
        setChatList(response.data);
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        console.log(err.response);
        return;
      }); 
    } catch (err) {
      return;
    }
  }

  let loadingMessageByContact = (idSessionContato: number) => {
    try {
      callCenterApi.post('/message/getByContato', { idSessionContato } ).then(response => {
        setMessageByContact(response.data)
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        console.log(err.response);
        return;
      }); 
    } catch (err) {
      return;
    }
  }

  const activeChatHandle = (key: number, idPhone: string) => {
    setActiveChat({ chatId: key, idPhone });

    loadingMessageByContact(key);
  } 

  const sendMessage = () => {
    try {
      callCenterApi.post('/client/sendMessage', { token: "7b5amfi431s2lmf", idPhone: activeChat.idPhone, msg: msgToSend }).then(response => {
        setMessageByContact([...messageByContact, { id: response.data.id,  msg: msgToSend, me: true, created_at: response.data.created_at }]);
        setMsgToSend('');
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        console.log(err.response);
        return;
      }); 
    } catch (err) {
      return;
    }
  }
  return (
    <Container>
      <SideBar page='chat' />
      <Body>
        <ContainerChat>
          <Contacts>
            {chatList.map((item: any) => (
              <Contact 
                key={item.id}
                onClick={() => activeChatHandle(item.id, item.id_phone)} 
                id={item.id_phone.toString()}
                className={`chat ${activeChat.chatId === item.id ? 'activeChat': ''}`}
              >
               
                <ContactInformation>
                  <div>
                    <strong>{item.name}</strong>
                    {activeChat.chatId !== item.id ? <p>{item.msg}</p> : ''}
                  </div>
                  {item.seen === true ? <></> : <FiInfo size={18} style={{ color: '#1E97F7' }} />}
                </ContactInformation>
              </Contact>
            ))}
          </Contacts>
            {activeChat.chatId !== undefined ?
            (
              <Menssagens>
                {messageByContact.map((msg) => (
                  <ItemMessage key={msg.id} className={ msg.me ? 'right' : 'left' }>
                    <div>
                      <strong>{msg.msg}</strong>
                      <span>{msg.created_at}</span>
                    </div>
                  </ItemMessage>
                ))}
                <div className="sendMessage">
                  <input value={msgToSend} type="text" onInputCapture={(e) => setMsgToSend(e.currentTarget.value)} ></input>
                  <button onClick={sendMessage}>ENVIAR</button>
                </div>
                <div onClick={() => { document.getElementById('554299436691@c.us')?.remove() }}>e</div>
              </Menssagens> 
            ) : <NotChatOpen />
            }
        </ContainerChat>
      </Body>
    </Container>
  );
}

export default Chat;