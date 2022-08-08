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
  const [openModalConsultDoctor, setOpenModalConsultDoctor] = useState<{name: string, phone: string, data?: string} | undefined>(undefined);
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
      <p>
        <strong>Data da atividade:</strong> 
        <input type="text" className="input-data-expanded" placeholder="01/01/22" onChange={(e) => data.date = e.currentTarget.value} defaultValue={data.date || ''}/>
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
      </div>
    </div>
  );

  useEffect(() => {
    promiseLoading();
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

  const generetLink = (number: string, type: 'examArrival' | 'a', date?: string) => {
    if(date === '' || !date || !number || number === '')  {
      return toast.warn('Necessita de uma data!');
    }

    return alert(moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
    if(type === 'examArrival') {
      window.open(`https://api.whatsapp.com/send?phone=${number}&text=Olá, sou do Centro de Saúde de Cruz Machado, seu exame chegou no dia ${date} ☺️, solicitamos que venha buscar o mais rápido possível!`);
    }
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <SideBar page='employee' />
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
              onClick={() => generetLink(openModalExamArrival.phone, 'examArrival', openModalExamArrival.data)}>ENVIAR</button>
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

              <button className="editar" 
              onClick={() => generetLink(openModalConsultDoctor.phone, 'examArrival', openModalConsultDoctor.data)}>ENVIAR</button>
              <button className="cancelar" onClick={() => setOpenModalExamArrival(undefined)}>CANCELAR</button>
            </div>
        </Modal>
        : <></>
      }
    </>
  );
}

export default Contact;