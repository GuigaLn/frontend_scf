import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';

import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface valueEmployee {
  id?: number; 
  name: string; 
  birthday: string;
  cpf: string;
  cns?: string;
  bedit?: string
  admission?: string;
  registration?: string
}

const Employee: React.FC = () => {
  const data2 = [{}];

  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  let valueAdd: valueEmployee = {name: '', birthday: '', cpf: ''};
  let [valueEdit, setValueEdit] = useState<valueEmployee>({name: '', birthday: '', cpf: ''});

  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "MATRICULA",
      selector: "registration",
      sortable: true,
    },
    {
      name: "NAME",
      selector: "name",
      sortable: true,
      minWidth: '300px',
      maxWidth: '300px'
    },
    {
      name: "NASCIMENTO",
      selector: "birthday",
      sortable: true
    },
    {
      name: "CPF",
      selector: "cpf",
      sortable: true
    },
    {
      name: "CNS",
      selector: "cns",
      sortable: true
    },
  ];

  const tableData = {
    columns,
    data,
  };

  useEffect(() => {
    promiseLoading();
  }, []);

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.get('/employee').then(response => {
          setData(response.data);
          setTimeout(resolve);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        return;
      }
    });

    toast.promise(
      reseolveApi,
      {
        pending: 'Consultando API',
        success: 'Sucesso ao Carregar',
        error: 'Erro ao Carregar 🤯'
      }
    )
  }

  const reloadData = () => {
    try {
      api.get('/employee').then(response => {
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
    let registration: any = null;

    if(valueAdd.registration) {
      registration = parseInt(valueAdd.registration);
    }
    
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/employee', {name: valueAdd.name, birthday: valueAdd.birthday, cpf: valueAdd.cpf, cns: valueAdd.cns, admission: valueAdd.admission, registration}).then(response => {
          setData([...data, {id: response.data.rows[0].id, registration: registration, name: valueAdd.name, birthday: valueAdd.birthday, cpf: valueAdd.cpf, cns: valueAdd.cns}]);
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
    let registration: any = null;

    if(valueEdit.registration) {
      registration = parseInt(valueEdit.registration!);
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/employee', {id: valueEdit.id, name: valueEdit.name, birthday: valueEdit.birthday, cpf: valueEdit.cpf, cns: valueEdit.cns, admission: valueEdit.admission, registration}).then(response => {
          reloadData();
          setTimeout(resolve);
          setOpenModal(false);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          setOpenModal(false);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        setOpenModal(false);
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


  return (
    <Container>
      <ToastContainer />
      <SideBar page='employee' />
      <Body>
        <h1>
          FUNCIONÁRIOS
        </h1>
        <button className="addColaborador" onClick={() => setOpenModalAdd(true)}>Adicionar Funcionário</button>
        <div className="table">
          <DataTableExtensions
            {...tableData}
            exportHeaders={true}
          >
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={5}
              onRowDoubleClicked={(e: any) => {setOpenModal(true); setValueEdit(e) }}
            />
          </DataTableExtensions>
        </div>
      </Body>
      {openModal ?
        <Modal>
          <div>
            <p>EDITAR FUNCIONÁRIO</p>
            <div className="titleInput"> Nome Completo *</div>
            <input type="text" onChange={(e) => valueEdit.name = e.currentTarget.value} defaultValue={valueEdit.name} />

            <div className="titleInput"> Data Nascimento *</div>
            <input type="date" onChange={(e) => valueEdit.birthday = e.currentTarget.value} defaultValue={valueEdit.bedit} />

            <div className="titleInput"> CPF *</div>
            <input type="text" onChange={(e) => valueEdit.cpf = e.currentTarget.value} defaultValue={valueEdit.cpf} />

            <div className="titleInput"> CNS</div>
            <input type="text" onChange={(e) => valueEdit.cns = e.currentTarget.value} defaultValue={valueEdit.cns} />

            <div className="titleInput"> Matricula</div>
            <input type="number" maxLength={6} onChange={(e) => valueEdit.registration = e.currentTarget.value} defaultValue={valueEdit.registration} />

            <div className="titleInput"> Data Adimissão</div>
            <input type="date" onChange={(e) => valueEdit.admission = e.currentTarget.value} defaultValue={valueEdit.admission} />

            <button className="editar" onClick={promiseEdit}>EDITAR</button>
            <button className="cancelar" onClick={() => setOpenModal(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }

      {openModalAdd ?
        <Modal>
          <div>
            <p>ADICIONAR FUNCIONÁRIO</p>
            <div className="titleInput"> Nome Completo *</div>
            <input type="text" onChange={(e) => valueAdd.name = e.currentTarget.value} placeholder="GUILHERME LEONARDO NALLON" />

            <div className="titleInput"> Data Nascimento *</div>
            <input type="date" onChange={(e) => valueAdd.birthday = e.currentTarget.value} />

            <div className="titleInput"> CPF *</div>
            <input type="text" onChange={(e) => valueAdd.cpf = e.currentTarget.value} placeholder="000.000.000-00" />

            <div className="titleInput"> CNS</div>
            <input type="text" onChange={(e) => valueAdd.cns = e.currentTarget.value} placeholder="0000..." />

            <div className="titleInput"> Matricula</div>
            <input type="number" maxLength={6} onChange={(e) => valueAdd.registration = e.currentTarget.value} placeholder="0000..." />

            <div className="titleInput"> Data Adimissão</div>
            <input type="date" onChange={(e) => valueAdd.admission = e.currentTarget.value}/>

            <button className="editar" onClick={promiseAdd}>CADASTRAR</button>
            <button className="cancelar" onClick={() => setOpenModalAdd(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }
    </Container>
  );
}

export default Employee;