import React, { useEffect, useState } from 'react';
import { Body, Container, Modal } from './styles';

import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { AxiosError } from 'axios';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';

interface valueEmployee {
  id?: number; 
  name: string; 
  phone: string;
  date?: string;
}

const Contact: React.FC = () => {
  const { signOut } = useAuth();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalExamArrival, setOpenModalExamArrival] = useState<{name: string, phone: string, data?: string} | undefined>(undefined);
  const [openModalConsultDoctor, setOpenModalConsultDoctor] = useState<{name: string, phone: string, data?: string, doctor?: string} | undefined>(undefined);
  const [openModalVaccine, setOpenModalVaccine] = useState<{name: string, phone: string, data?: string, doctor?: string} | undefined>(undefined);
  let valueAdd: valueEmployee = {name: '', phone: ''};
  let [valueEdit, setValueEdit] = useState<valueEmployee>({name: '', phone: ''});

  const [data, setData] = useState<any>();
  const columns: any = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row: any) => row.name,
      sortable: true,
      minWidth: '300px',
      maxWidth: '300px'
    },
    {
      name: "TELEFONE",
      selector: (row: any) => row.phone,
      sortable: true
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const ExpandedComponent = ({ data }: any) => (
    <div className="contact-details">
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Nome:</strong> {data.name}
      </p>
      <p>
        <strong>Telefone:</strong> {data.phone}
      </p>

      <p style={{ marginTop: '10px' }}><strong>Atividade:</strong> </p> 
      <div className="buttons-expanded">
        
        <span className="option-button-expanded" 
          onClick={() => setOpenModalExamArrival({name: data.name, phone: data.phone})}>
          Chegada do exame
        </span>

        <span className="option-button-expanded" 
          onClick={() => setOpenModalConsultDoctor({name: data.name, phone: data.phone})}>
          Consulta Médica
        </span>

        <span className="option-button-expanded" 
          onClick={() => setOpenModalConsultDoctor({name: data.name, phone: data.phone})}>
          Agendamento Vacina
        </span>

        <span className="option-button-expanded" 
          onClick={() => setOpenModalConsultDoctor({name: data.name, phone: data.phone})}>
          Vacina criança atrasada
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    promiseLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let promiseLoading = () => {
    try {
      api.get('/contact').then(response => {
        setData(response.data);
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

  const reloadData = () => {
    try {
      api.get('/contact').then(response => {
        setData(response.data);
        return;
      }).catch((err) => {
        console.log(err);
        return;
      }); 
    } catch (err) {
      console.log(err);      
    }
  }

  let promiseAdd = () => {
    if(!valueAdd.name || !valueAdd.phone || valueAdd.name.length < 5 || valueAdd.phone.length < 10) {
      return toast.warn('Nome e telefone são obrigatórios!');
    }
    
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/contact', {name: valueAdd.name, phone: valueAdd.phone }).then(response => {
          reloadData()
          setTimeout(resolve);
          setOpenModalAdd(false);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          //setOpenModalAdd(false);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        //setOpenModalAdd(false);
        return;
      }
    });

    toast.promise(
      reseolveApi,
      {
        pending: 'Consultando API',
        success: 'Sucesso ao Cadastrar 👌',
        error: 'Erro ao Cadastrar 🤯'
      }
    )
  }

  let promiseEdit = () => {
    if(!valueEdit.name || !valueEdit.phone) {
      toast.warn('Nome e telefone são obrigatórios!');
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/contact', {id: valueEdit.id, name: valueEdit.name, phone: valueEdit.phone}).then(response => {
          reloadData();
          setTimeout(resolve);
          setOpenModalEdit(false);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          setOpenModalEdit(false);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        setOpenModalEdit(false);
        return;
      }
    });

    toast.promise(
      reseolveApi,
      {
        pending: 'Consultando API',
        success: 'Sucesso ao Editar 👌',
        error: 'Erro ao Editar 🤯'
      }
    )
  }

  const generetLink = async (number: string, name: string, type: 'examArrival' | 'medicalAppointment', date?: string, doctor?: string) => {
    if(date === '' || !date || !number || number === '')  {
      return toast.warn('Necessita de uma data!');
    }

    if(type === 'examArrival') {
      await promiseSaveHistoric(number, `Centro de Saúde de Cruz Machado%0A%0AOlá *${name}*,%0AInformamos que seu exame chegou no dia *${moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}* ☺️, solicitamos que venha buscar o mais rápido possível! %0A%0A*Cruz machado para todos!*`);
      window.open(`https://api.whatsapp.com/send?phone=${number}&text=Centro de Saúde de Cruz Machado%0A%0AOlá *${name}*,%0AInformamos que seu exame chegou no dia *${moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}* ☺️, solicitamos que venha buscar o mais rápido possível! %0A%0A*Cruz machado para todos!*`, "", "width=600,height=400,left=300,top=200");
    } else if (type === 'medicalAppointment') {
      if(doctor && doctor !== '') {
        await promiseSaveHistoric(number, `Centro de Saúde de Cruz Machado%0A%0AOlá *${name}*,%0Ainformamos que sua consulta com o/a ${doctor}, foi agendado para o dia *${moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}* ☺️, em caso de desistência ligar para (42) 3554-1294! %0A%0A*Cruz machado para todos!*`);
        window.open(`https://api.whatsapp.com/send?phone=${number}&text=Centro de Saúde de Cruz Machado%0A%0AOlá *${name}*,%0Ainformamos que sua consulta com o/a ${doctor}, foi agendado para o dia *${moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}* ☺️, em caso de desistência ligar para (42) 3554-1294! %0A%0A*Cruz machado para todos!*`, "", "width=600,height=400,left=300,top=200");
      } else {
        alert('Selecione um médico!')
      }
    }
  }

  let promiseSaveHistoric = async (phone: string, message: string) => {    
    const reseolveApi = new Promise(async (resolve, reject) => {
    try {
      await api.post('/contact/storeHistoricMessage', {phone: phone, message: message }).then(response => {
        setTimeout(resolve);
        return;
      }).catch((err) => {
        setTimeout(reject);
        console.log(err);
        return;
      }); 
    } catch (err) {
      setTimeout(reject);
      console.log(err);
      return;
    }
  });

  toast.promise(
    reseolveApi,
    {
      pending: 'Consultando API',
      success: 'histórico de mensagem armazenada 👌',
      error: 'Erro ao armazenar 🤯'
    }
  )
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <SideBar page='contact' />
        <Body>
          <h1>
            CONTATOS
          </h1>
          <button className="addColaborador" onClick={() => setOpenModalAdd(true)}>Adicionar Contato</button>
          <div className="table">
            <DataTableExtensions
              {...tableData}
              exportHeaders={true}
            >
              <DataTable
                columns={columns}
                data={data}
                pagination
                paginationPerPage={30}
                onRowDoubleClicked={(e: any) => {(setValueEdit(e));setOpenModalEdit(true) }}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked
              />
            </DataTableExtensions>
          </div>
        </Body>
      </Container>
      {openModalEdit ?
        <Modal>
          <div>
              <p>EDITAR CONTATO</p>
              <div className="titleInput"> Nome Completo *</div>
              <input type="text" onChange={(e) => valueEdit.name = e.currentTarget.value} defaultValue={valueEdit.name} />

              <div className="titleInput"> Telefone * (com ddd)</div>
              <input type="text" onChange={(e) => valueEdit.phone = e.currentTarget.value} defaultValue={valueEdit.phone} />

              <button className="editar" onClick={promiseEdit}>EDITAR</button>
              <button className="cancelar" onClick={() => setOpenModalEdit(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }

      {openModalAdd ?
        <Modal>
            <div>
              <p>ADICIONAR CONTATO</p>
              <div className="titleInput"> Nome Completo *</div>
              <input type="text" onChange={(e) => valueAdd.name = e.currentTarget.value} placeholder="GUILHERME LEONARDO NALLON" />

              <div className="titleInput"> Telefone * (com ddd) </div>
              <input type="text" onChange={(e) => valueAdd.phone = e.currentTarget.value} placeholder="4299999999" />            

              <button className="editar" onClick={promiseAdd}>CADASTRAR</button>
              <button className="cancelar" onClick={() => setOpenModalAdd(false)}>CANCELAR</button>
            </div>
        </Modal>
        : <></>
      }

      {openModalExamArrival ?
        <Modal>
            <div>
              <p>CHEGADA DO EXAME</p>
              <div className="titleInput"> {openModalExamArrival.name} - {openModalExamArrival.phone}</div>

              <div className="titleInput"> Data: * </div>
              <input type="date" onChange={(e) => openModalExamArrival.data = e.currentTarget.value} placeholder="4299999999" />            

              <button className="editar" 
              onClick={() => generetLink(openModalExamArrival.phone, openModalExamArrival.name, 'examArrival', openModalExamArrival.data)}>ENVIAR</button>
              <button className="cancelar" onClick={() => setOpenModalExamArrival(undefined)}>CANCELAR</button>
            </div>
        </Modal>
        : <></>
      }

      {openModalConsultDoctor ?
        <Modal>
            <div>
              <p>CONSULTA MÉDICA</p>
              <div className="titleInput"> {openModalConsultDoctor.name} - {openModalConsultDoctor.phone}</div>

              <div className="titleInput"> Data: * </div>
              <input type="date" onChange={(e) => openModalConsultDoctor.data = e.currentTarget.value} placeholder="4299999999" />    

              <div className="titleInput"> Médico: * </div>
              <select className="selectDoctor" onChange={e => openModalConsultDoctor.doctor = (e.currentTarget.value)}>
                <option value=''>Selecione</option>
                <option value='*DRA. KARINE DA SILVA* (médico clínico)'>KARINE DA SILVA</option>
                <option value='*DR.	DAVID SILVEIRA COSTA* (médico clínico)'>DAVID SILVEIRA COSTA</option>
                <option value='*DR. CLAUDIO OTHARAN NUNES* (médico clínico)'>CLAUDIO OTHARAN NUNES</option>
                <option value='*DR. DAVID HISSAO AOKI* (médico clínico)'>DAVID HISSAO AOKI</option>
                <option value='*DR. DICESAR TERNA DE CAMPOS* (médico obstetra e ginecologista)'>DICESAR TERNA DE CAMPOS</option>
                <option value='*DR. BRUNO MUSSI FIGUEIREDO* (médico psiquiatra)'>BRUNO MUSSI FIGUEIREDO</option>
              </select>        

              <button className="editar" 
              onClick={() => generetLink(openModalConsultDoctor.phone, openModalConsultDoctor.name,'medicalAppointment', openModalConsultDoctor.data, openModalConsultDoctor.doctor)}>ENVIAR</button>
              <button className="cancelar" onClick={() => setOpenModalConsultDoctor(undefined)}>CANCELAR</button>
            </div>
        </Modal>
        : <></>
      }
    </>
  );
}

export default Contact;