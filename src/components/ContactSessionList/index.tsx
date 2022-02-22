import { gql, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import { Contact, Contacts, ContactInformation } from './styles';

interface InterfaceSessionsContact{
  id: number;
  contato: {
    name: string
    id_phone: string
  };
  mensagens: [
    {
      texto: string
    }
  ];
}

interface IntefaceActiveChat {
  chatId?: number
  idPhone?: string
}

//idPhone: '', chatId: 0
interface SessionsContactProps {
  activeChat: IntefaceActiveChat
  setActiveChat: React.Dispatch<React.SetStateAction<IntefaceActiveChat>>
}

const ContactSessionList: React.FC<SessionsContactProps> = ({ activeChat, setActiveChat }) => {
  const [sessionsContact, setSessionsContact] = useState<InterfaceSessionsContact[]>([]);

  const CONSTACTS_SESSION_SUBSCRIPTION = gql`
    subscription ContactSubscription {
      contato_sessao_mensagens(where: {realizado: {_eq: false}}, order_by: {mensagens_aggregate: {stddev_pop: {id: desc}}}) {
        id
        id_setor
        contato {
          name
          id_phone
        }
        mensagens(limit: 1, order_by: {id: desc}) {
          texto
        }
      }
    }
  `;

  const contactsSessions = useSubscription(CONSTACTS_SESSION_SUBSCRIPTION);

  useEffect(() => {
    if(contactsSessions.data !== undefined) {
      setSessionsContact(contactsSessions.data.contato_sessao_mensagens);
    }

    if (contactsSessions.error?.message === 'Observable cancelled prematurely') {
      window.location.reload();
    }
    
  }, [ contactsSessions ]);


  const activeChatHandle = (key: number, idPhone: string) => {
    localStorage.setItem('@panel-ticket/idSessionContato', key.toString());
    setActiveChat({chatId: key, idPhone});
  } 
  
  return (
    <Contacts>
      {sessionsContact.map((item) => (
        <Contact
          key={item.id}
          onClick={() => activeChatHandle(item.id, item.contato.id_phone)} 
          id={item.contato.id_phone.toString()}
          className={`chat ${activeChat.chatId === item.id ? 'activeChat': ''}`}
        >
          <ContactInformation>
            <div className="content">
              <div className="img" style={{ backgroundImage:  "url(https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG)" }} />
              <div className="information">
                <strong>{item.contato.name}</strong>
                <p>{item.mensagens[0].texto}</p>
              </div>
            </div>
          </ContactInformation>
        </Contact>
      ))}
    </Contacts>
  );
}

export default ContactSessionList;