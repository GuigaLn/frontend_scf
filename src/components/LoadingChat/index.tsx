import React from 'react';

import { FiLoader } from 'react-icons/fi';

import { BodyLoadingChat } from './styles';

const LoadingChat: React.FC = (props) => {
  return (
    <BodyLoadingChat>
      <FiLoader className="logoLoader" />
      <p>Aguarde!</p>
      <span>As mensagens estão sendo carregandas.</span>
    </BodyLoadingChat>
  );
}

export default LoadingChat;