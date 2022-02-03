import React, { useEffect, useRef, useState } from 'react';
import { Container, Modal, Body, ContainerChat, Contact, ContactInformation, Contacts, Menssagens, ItemMessage } from './styles';
import SideBar from '../../../components/SideBar';

import callCenterApi from '../../../services/callCenterApi';

import NotChatOpen from '../../../components/NotChatOpen';
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiCheckSquare, FiInfo, FiPaperclip, FiSend, FiShuffle, FiThumbsUp} from 'react-icons/fi';

import socketIoClient from "socket.io-client";
import { END_POINT_CALL_CENTER } from '../../../services/utils';

import Message from '../../../components/Message';

interface IntefaceActiveChat {
  chatId?: number
  idPhone?: string
}

interface InterfaceMessageByContact {
  id: number
  msg: string
  me: boolean
  typemessage: number
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

  /* LISTA DE CONTATOS E ULTIMAS MSG ATIVA */
  const [chatList, setChatList] = useState<InterfaceMessageWithContact[]>([]);
  /* PEGA TODAS MENSAGENS DA ULTIMA SESSAO */
  const [messageByContact, setMessageByContact] = useState<InterfaceMessageByContact[]>([]);
  const [activeChat, setActiveChat] = useState<IntefaceActiveChat>({});
  const [msgToSend, setMsgToSend] = useState('');

  const [modalError, setModalError] = useState(false);
  const [modalUpdateSector, setModalUpdateSector] = useState(false);
  const [idSectorUpdate, setIdSectorUpdate] = useState('0');


  const messagesEndRef: any = useRef(null)

  useEffect(() => {
    promiseLoadingContacts();

    var tokenIdLocal = localStorage.getItem("@ScfUserAuth:token");

    /* VERIFICA SE EXISTE SECTOR ID DEFINIDO */
    if(tokenIdLocal === undefined && tokenIdLocal && !modalError) {
      /* INICIA UM END_POIN PARA REALIZAR AS CHAMADAS DO PAINEL */
      const socket = socketIoClient(END_POINT_CALL_CENTER, { extraHeaders: { tokenIdLocal: 'tokenIdLocal.toString()' }});

      socket.on('error', (error) => {
        setModalError(true);
        socket.disconnect();
        document.getElementById("errorId")!.innerHTML="Error ID: " + error;
      });
      
      socket.on('sucess', (sucess) => {
        console.log(sucess);
        /* CASO CONECTE SETA AS VARIAVEIS LOCAIS E CHAMA UM LOADING INICIAL (PUXAR ULTIMAS SENHAS) */
      });

      socket.on('newMessage', (message) => {
        /* CASO RECEBA UMA NOVA MENSAGEM */

        promiseLoadingContacts();
        if(Number(localStorage.getItem('@panel-ticket/idSessionContato')) === Number(message.id)) {
          if(message.messageType !== 1) {
            loadingMessageByContact(Number(message.id));
          }
          setMessageByContact(oldArray => [...oldArray, { id: message.idMessage, msg: message.msg, me: false, typemessage: message.messageType }]);
        }
      });

      socket.on('disconnect', () => {
        /* SE POR ALGUM MOTIVO DESCONECTAR, ELE CHAMA UM MODAL DE ATUALIZAÇÃO DE PAGINA */
        setModalError(true);
        socket.disconnect();
        document.getElementById("errorId")!.innerHTML="Error ID: Client Disconnected";
      });
    }
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
      callCenterApi.post('/message/getByContato', { idSessionContato: Number(localStorage.getItem('@panel-ticket/idSessionContato')) } ).then(response => {
        setMessageByContact(response.data);
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
    localStorage.setItem('@panel-ticket/idSessionContato', key.toString());
    setActiveChat({chatId: key, idPhone});

    loadingMessageByContact(key);
  } 

  const sendMessage = () => {
    try {
      callCenterApi.post('/client/sendMessage', { token: "7b5amfi431s2lmf", idPhone: activeChat.idPhone, msg: msgToSend }).then(response => {
        setMessageByContact([...messageByContact, { id: response.data.id,  msg: msgToSend, me: true, created_at: response.data.created_at, typemessage: 1 }]);
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

  const AlwaysScrollToBottom = () => {
    const elementRef: any = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

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
    <Container>
      <SideBar page='chat' />
      <Body>
        <ContainerChat>
          <Contacts id="contactList">

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
                    <p>{item.msg}</p>
                  </div>
                  {item.seen === true ? <></> : <FiInfo size={18} style={{ color: '#1E97F7' }} />}
                </ContactInformation>
              </Contact>
            ))}
          </Contacts>
            {activeChat.chatId !== undefined ?
            (
              <Menssagens>
                <div className="header-message">
                  <div className="buttons">
                    <FiShuffle onClick={() => setModalUpdateSector(true)} size={22} className="button-item" />
                    <FiThumbsUp size={22} className="button-item" />
                  </div>
                  <FiPaperclip size={22} className="button-send-anexo" />
                </div>
                <div  ref={messagesEndRef} className="container">
                  {messageByContact.map((msg) => (
                    <ItemMessage key={msg.id} className={ msg.me ? 'right' : 'left' }>
                      <Message msg={`${msg.msg}`} typeMessage={msg.typemessage} created_at={`${msg.created_at}`} />
                    </ItemMessage>
                  ))}
                  <AlwaysScrollToBottom />                  
                </div>
                <div className="sendMessage">
                    <input defaultValue=""  onSubmitCapture={() => console.log("d")} type="text" onInputCapture={(e) => setMsgToSend(e.currentTarget.value)} ></input>
                    <FiSend size={28} className="button-send" onClick={sendMessage} />
                </div>
                
              </Menssagens> 
            ) : <NotChatOpen />
            }
        </ContainerChat>
      </Body>

      {modalError ?
      <Modal>
        <div id="modalError">
          <h1>ERRO AO SE COMUNICAR COM O SERVIDOR!</h1>
          <p>CLIQUE EM ATUALIZAR, CASO NÃO FUNCIONE VERIFIQUE SE NÃO EXISTE NENHUMA TV USANDO O MESMO SETOR!</p>
          <p className='errorId' id="errorId"></p>
          <button onClick={() => window.location.reload()}>RECARREGAR</button>
        </div>
      </Modal>
      : <></>}

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
    </Container>
  );
}

export default Chat;