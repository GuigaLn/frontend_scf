import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';
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

const City: React.FC = () => {
  const data2 = [{}];

  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [value, setValue] = useState<valueCity>({id: 0, description: "Error", idcity: 0});
  const [description, setDescription] = useState('');
  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "ID",
      selector: "idcity",
      sortable: true
    },
    {
      name: "Descrição",
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
      <SideBar page='city' />
      <Body>
        <h1>
          CIDADES
        </h1>
        <button className="addColaborador" onClick={() => setOpenModalAdd(true)}>Adicionar Cidade</button>
        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => {setOpenModal(true); setValue(e) }}
          />
        </div>
      </Body>
      {openModal ?
        <Modal>
          <div>
            <p>EDITAR CIDADE</p>
            <input type="text" onChange={(e) => value.description = e.currentTarget.value} defaultValue={value.description}/>
            <button className="editar" onClick={promiseEdit}>EDITAR</button>
            <button className="excluir" onClick={promiseDelete}>EXCLUIR</button>
            <button className="cancelar" onClick={() => setOpenModal(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }

      {openModalAdd ?
        <Modal>
          <div>
            <p>ADICIONAR CIDADE</p>
            <input type="text"  onChange={(e) => setDescription(e.currentTarget.value)} placeholder="NOME DA CIDADE" />
            <button className="editar" onClick={promiseAdd}>CADASTRAR</button>
            <button className="cancelar" onClick={() => setOpenModalAdd(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }
    </Container>
  );
}

export default City;