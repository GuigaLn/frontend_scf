import React, { useState } from 'react';
import { Container, Modal, Body, ContainerChat } from './styles';
import SideBar from '../../../components/SideBar';

import callCenterApi from '../../../services/callCenterApi';

import NotChatOpen from '../../../components/NotChatOpen';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';

import MessagesChat from '../../../components/MessagesChat';
import ContactSessionList from '../../../components/ContactSessionList';

interface IntefaceActiveChat {
  chatId?: number;
  idPhone?: string;
  attendance?: boolean;
}

const Chat: React.FC = () => {
  const { signOut } = useAuth();
  
  /* PEGA TODAS MENSAGENS DA ULTIMA SESSAO */
  const [activeChat, setActiveChat] = useState<IntefaceActiveChat>({idPhone: '', chatId: 0});

  const [modalUpdateSector, setModalUpdateSector] = useState(false);
  const [idSectorUpdate, setIdSectorUpdate] = useState('0');
    
  const updateSessionContact = () => {
    try {
      callCenterApi.put('/sessionsContact', { idSector: Number(idSectorUpdate), idSessionContato: activeChat.chatId }).then(response => {
        setActiveChat({chatId: undefined, idPhone: undefined});
        setModalUpdateSector(false);
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
      console.log(err);
      return;
    }
  }

  return (
    <>
      <Container>
        <SideBar page='chat' />
        <Body>
          <ContainerChat>
            <ContactSessionList activeChat={activeChat} setActiveChat={setActiveChat} />
            {activeChat.chatId !== undefined && activeChat.chatId !== 0 && activeChat.idPhone ?
            (
              <MessagesChat chatId={activeChat.chatId}  attendance={activeChat.attendance} idPhone={activeChat.idPhone} setModalUpdateSector={setModalUpdateSector} />
            ) : <NotChatOpen />
            }
          </ContainerChat>
        </Body>
      </Container>

      {modalUpdateSector ?
        <Modal>
          <div className="edit">
            <p>DIGITE O SETOR PARA TRANFERIR A CONVERSA</p>
            <input type="number"  onChange={(e) => setIdSectorUpdate(e.currentTarget.value)} />
            <button className="editar" onClick={updateSessionContact}>TRANSFERIR</button>
            <button className="cancelar" onClick={() => setModalUpdateSector(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }
    </>
  );
}

export default Chat;