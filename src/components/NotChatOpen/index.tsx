import React from 'react';

import { FiMessageCircle } from 'react-icons/fi';

import { BodyNotChatOpen } from './styles';

const NotChatOpen: React.FC = (props) => {
  return (
    <BodyNotChatOpen>
      <FiMessageCircle className="LogoMenssage" />
      <p>Nenhuma Chat Aberto!</p>
      <span>Selecione algum contato ao lado, para que seja mostrado as mensagens.</span>
    </BodyNotChatOpen>
  );
}

export default NotChatOpen;