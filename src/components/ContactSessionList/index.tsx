import { gql, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';

import { Contact, Contacts, ContactInformation } from './styles';
import { FiSearch } from 'react-icons/fi';
import moment from 'moment';

interface InterfaceContacts {
  id: number;
  id_phone: string
  name: string
}

interface InterfaceSessionsContact{
  id: number;
  atendimento: boolean;
  contato: {
    name: string
    id_phone: string
  };
  mensagens: [
    {
      texto: string
      gerado: string
    }
  ];
}

interface IntefaceActiveChat {
  chatId?: number
  idPhone?: string
  attendance?: boolean
}

//idPhone: '', chatId: 0
interface SessionsContactProps {
  activeChat: IntefaceActiveChat
  setActiveChat: React.Dispatch<React.SetStateAction<IntefaceActiveChat>>
}

const ContactSessionList: React.FC<SessionsContactProps> = ({ activeChat, setActiveChat }) => {
  const [sessionsContact, setSessionsContact] = useState<InterfaceSessionsContact[]>([]);
  const [contacts, setContacts] = useState<InterfaceContacts[]>([]);

  const CONSTACTS_GET_ALL = gql`
  subscription ContactGetAll {
      contato {
        id
        id_phone
        name
      }
    }
  `;

  const CONSTACTS_SESSION_SUBSCRIPTION = gql`
    subscription ContactSubscription {
      contato_sessao_mensagens(where: {realizado: {_eq: false}}, order_by: {mensagens_aggregate: {stddev_pop: {id: desc}}}) {
        id
        atendimento
        id_setor
        contato {
          name
          id_phone
        }
        mensagens(limit: 1, order_by: {id: desc}) {
          texto
          gerado
        }
      }
    }
  `;

  const contactsSessions = useSubscription(CONSTACTS_SESSION_SUBSCRIPTION);
  const contactsAll = useSubscription(CONSTACTS_GET_ALL);

  useEffect(() => {
    if(contactsSessions.data !== undefined) {
      setSessionsContact(contactsSessions.data.contato_sessao_mensagens);
    }

    if(contactsAll.data !== undefined) {
      console.log(contactsAll)
      setContacts(contactsAll.data);
    }

    if (contactsSessions.error?.message === 'Observable cancelled prematurely') {
      window.location.reload();
    }
    
  }, [ contactsSessions, contactsAll ]);


  const activeChatHandle = (key: number, idPhone: string, attendance: boolean) => {
    localStorage.setItem('@panel-ticket/idSessionContato', key.toString());
    setActiveChat({chatId: key, idPhone, attendance});
  } 
  
  return (
    <Contacts>
      <div className="sector">
        <strong>SETOR</strong>
        <span>GERAL</span>
      </div>

      <div className="search_chat">
        <FiSearch className="icon_search" />
        <input type="text" />
      </div>
      {sessionsContact.map((item) => (
        <Contact
          key={item.id}
          onClick={() => activeChatHandle(item.id, item.contato.id_phone, item.atendimento)} 
          id={item.contato.id_phone.toString()}
          className={`chat ${activeChat.chatId === item.id ? 'activeChat': ''}`}
        >
          <ContactInformation attendance={item.atendimento}>
            <div className="content">
              <div className="img" style={{ backgroundImage:  "url(https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG)" }} />
              <div className="information">
                <strong>{item.contato.name}</strong>
                <p>{item.mensagens[0].texto}</p>
                <div className="attendent">
                  <span className="tag_attendance">{item.atendimento ? 'em atendimento' : 'sem atendimento' }</span>
                  <span className="time_last_message">{moment(item.mensagens[0].gerado).format("HH:mm")}</span>
                </div>
              </div>
            </div>
          </ContactInformation>
        </Contact>
      ))}
    </Contacts>
  );
}

export default ContactSessionList;