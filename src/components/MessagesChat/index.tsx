import React, { useEffect, useRef, useState } from 'react';

import Message from '../Message';

import { FiPaperclip, FiSend, FiShuffle, FiThumbsUp } from 'react-icons/fi';

import callCenterApi from '../../services/callCenterApi';

import { Menssagens, ItemMessage } from './styles';
import moment from 'moment';
import { AxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';
import { gql, useSubscription } from '@apollo/react-hooks';
import LoadingChat from '../LoadingChat';
import MessageAutomatic from '../MessageAutomatic';

interface InterfaceMessages {
  id: number;
  texto: string;
  me: boolean;
  tipo_mensagem: number;
  gerado?: string;
}

interface MessageChatProps {
  chatId: number;
  idPhone: string;
  attendance?: boolean;
  setModalUpdateSector: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessagesChat: React.FC<MessageChatProps> = ({ chatId, idPhone, attendance, setModalUpdateSector }) => {
  const [messages, setMessages] = useState<InterfaceMessages[]>([]);
  const [msgToSend, setMsgToSend] = useState('');
  const messagesEndRef: any = useRef(null); 
  const [loading, setLoading] = useState(true);

  const { signOut } = useAuth();

  // FUNÇÃO INICIAR SUBSCRIPTION
  const MESSAGES_CONTATO_SUBSCRIPTION = gql`
    subscription SubscriptionGetMessages {
      mensagens(where: {id_contato_sessao: {_eq: ${chatId}}}, order_by: {id: asc}) {
        id
        tipo_mensagem
        texto
        me
        gerado
      }
    }  
  `;

  const getMessages = useSubscription(MESSAGES_CONTATO_SUBSCRIPTION);

  useEffect(() => {
    setLoading(true);
    if(getMessages.data !== undefined) {
      setMessages(getMessages.data.mensagens);
      setLoading(false);
    }

    if (getMessages.error?.message === 'Observable cancelled prematurely') {
      window.location.reload();
    }    
  }, [ getMessages, getMessages.error?.message, setLoading]);

  // FAZER O CHAT IR PARA O FINAL DA PAGINA
  const AlwaysScrollToBottom = () => {
    const elementRef: any = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  // FUNÇÃO ENVIAR MENSAGEM
  const sendMessage = () => {
    try {
      callCenterApi.post('/client/sendMessage', { token: "7b5amfi431s2lmf", idPhone: idPhone, msg: msgToSend }).then(response => {
        //setMessages([...messages, { id: response.data.id,  texto: msgToSend, me: true, gerado: response.data.created_at, tipo_mensagem: 1 }]);
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
    loading ? <LoadingChat /> :
    <Menssagens>
      <div className="header-message">
        <div className="buttons">
          <FiShuffle onClick={() => setModalUpdateSector(true)} size={22} className="button-item" />
          <FiThumbsUp size={22} className="button-item" />
        </div>
        <FiPaperclip size={22} className="button-send-anexo" />
      </div>
      <div  ref={messagesEndRef} className="container">
        <p>Carregar mensagens antigas</p>
        {messages.map((msg) => (
          <ItemMessage key={msg.id} className={ msg.me ? 'right' : 'left' }>
            <Message msg={`${msg.texto}`} typeMessage={msg.tipo_mensagem} created_at={`${moment(msg.gerado).format("HH:mm - DD/MM")}`} />
          </ItemMessage>
        ))}
        <AlwaysScrollToBottom />                  
      </div>
      <div className="sendMessage">
          {attendance !== true ?
            <button className="take_care">Assumir Atendimento</button>
          :<>
            <MessageAutomatic setMsgToSend={setMsgToSend} />
            <input defaultValue=""  value={msgToSend} onSubmitCapture={() => console.log("d")} type="text" onInputCapture={(e) => setMsgToSend(e.currentTarget.value)} ></input>
            <FiSend size={28} className="button-send" onClick={sendMessage} />
          </>
          }
      </div>
    </Menssagens> 
  );
}

export default MessagesChat;