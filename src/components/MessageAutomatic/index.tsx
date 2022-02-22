import React, { useState } from 'react';

import { FiCopy, FiInbox } from 'react-icons/fi';

import { MessageAutomaticContainer } from './styles';

interface MessageAutomaticProps {
  setMsgToSend: React.Dispatch<React.SetStateAction<string>>;
}

const MessageAutomatic: React.FC<MessageAutomaticProps> = ({ setMsgToSend }) => {
  const listMessagesAutomatic = [
    'Olá, este canal é para comunicação com Secretaria Municipal de Saúde. 😀',
    'Como posso ajudar no dia de hoje? 😊',
    'Tenha um exelente dia, qualquer dúvida estamos aqui. 😁'
  ]
  const [openModalMessageAutomatic, setOpenModalMessageAutomatic] = useState(false)
  return (
    <MessageAutomaticContainer className="message_automatic">
      <FiInbox size={28} className="button-send" onClick={() => setOpenModalMessageAutomatic(!openModalMessageAutomatic)} />
      {openModalMessageAutomatic &&
        <div className="list_message_automatic">
          {listMessagesAutomatic.map((item) => (
            <div  onClick={() => {setOpenModalMessageAutomatic(false);setMsgToSend(item)}} className="item_message_automatic">
              <span>{item}</span>
              <FiCopy size={18} className="icon_message_automatic" />
            </div>
          ))}
        </div>
      }
    </MessageAutomaticContainer>
  );
}

export default MessageAutomatic;