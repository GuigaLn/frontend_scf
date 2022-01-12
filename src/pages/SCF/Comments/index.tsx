import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface valueComments {
  id: number; 
  idpontoobs: number; 
  description: string;
}

const TimeAttendance: React.FC = () => {
  const data2 = [{}];

  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [value, setValue] = useState<valueComments>({id: 0, description: "Error", idpontoobs: 0});
  const [description, setDescription] = useState('');
  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "ID",
      selector: (row: any) => row.idpontoobs,
      sortable: true
    },
    {
      name: "Descrição",
      selector: (row: any) => row.description,
      sortable: true
    },
  ];

  useEffect(() => {
    promiseLoading();
  }, []);

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.get('/comments').then(response => {
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
      api.get('/comments').then(response => {
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
        api.post('/comments', {description: description}).then(response => {
          setData([...data, {id: response.data.rows[0].id, description, idpontoobs: response.data.rows[0].id}]);
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
        api.put('/comments', {description: value.description, id: value.id}).then(response => {
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

  let promiseDelete = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/comments/delete', {id: value.id}).then(response => {
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
        success: 'Sucesso ao Deletar 👌',
        error: 'Erro ao Deletar 🤯'
      }
    )
  }

  return (
    <Container>
      <ToastContainer />
      <SideBar page='comments' />
      <Body>
        <h1>
          OBSERVAÇÕES PONTO
        </h1>
        <button className="addColaborador" onClick={() => setOpenModalAdd(true)}>Adicionar Observações Ponto</button>
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
            <p>EDITAR OBSERVAÇÕES PONTO</p>
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

export default TimeAttendance;