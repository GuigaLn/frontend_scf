import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body } from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface valueCity {
  id: number; 
  idcity: number; 
  description: string;
}

const EmployeeDetail: React.FC = () => {
  const data2 = [{}];

  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [value, setValue] = useState<valueCity>({id: 0, description: "Error", idcity: 0});
  const [description, setDescription] = useState('');
  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "E-MAIL",
      selector: "description",
      sortable: true
    },
  ];

  useEffect(() => {
    promiseLoading();
  }, []);

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.get('/city').then(response => {
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
      api.get('/city').then(response => {
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
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/city', {description: description}).then(response => {
          setData([...data, {id: response.data.rows[0].id, description, idcity: response.data.rows[0].id}]);
          setTimeout(resolve);
          setOpenModalAdd(false);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          setOpenModalAdd(false);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        setOpenModalAdd(false);
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
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/city', {description: value.description, id: value.id}).then(response => {
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
        pending: 'Editando Cidade',
        success: 'Sucesso ao Editar 👌',
        error: 'Erro ao Editar 🤯'
      }
    )
  }

  let promiseDelete = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/city/delete', {id: value.id}).then(response => {
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
        pending: 'Deletando Cidade',
        success: 'Sucesso ao Deletar 👌',
        error: 'Erro ao Deletar 🤯'
      }
    )
  }

  return (
    <Container>
      <ToastContainer />
      <SideBar page='employee' />
      <Body>
        <h1>1957 - GUILHERME LEONARDO NALLON</h1>
        <span>Data Nascimento: 19/04/2000</span>
        <span>CPF: 085.800.259-07</span>
        <span>CNS: 085.800.259-07</span>

        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => {setOpenModal(true)}}
          />
        </div>

        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => {setOpenModal(true)}}
          />
        </div>

        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => {setOpenModal(true)}}
          />
        </div>

        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => {setOpenModal(true)}}
          />
        </div>

      </Body>
    </Container>
  );
}

export default EmployeeDetail;