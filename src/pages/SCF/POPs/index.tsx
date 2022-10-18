import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';
import { Body, Container } from './styles';

import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';

import { FiEdit, FiFile, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { END_POINT } from '../../../services/config';

const POPs: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  const { signOut, user } = useAuth();
  
  const history = useHistory();
  
  const columns: any = [
    {
      name: "Número",
      width: "100px",
      selector: (row: any) => row.number,
      sortable: true
    },
    {
      name: "Título",
      selector: (row: any) => row.title,
      sortable: true
    },
    {
      name: "Status",
      width: "200px",
      selector: (row: any) => row.autorized_by ? <div style={{ background: '#07d807', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>APROVADO</div> : row.canceled_by ? 
      <div style={{ background: '#d80a07', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>CANCELADO</div> : 
      <div style={{ background: '#d8ab07', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>PENDENTE</div>,
      sortable: true
    },
    {
      name: "Ver",
      width: "80px",
      selector: (row: any) => <span  onClick={() => window.open(`${END_POINT}/uploads/${row.file}`)} style={{ cursor: 'pointer' }}><FiFile /></span>,
      sortable: true
    },
    {
      name: "Editar",
      width: "80px",
      selector: (row: any) => <span onClick={() => history.push(`/scf/pops/edit/${row.id}`)} style={{ cursor: 'pointer' }}><FiEdit /></span>,
      sortable: true
    },
  ];

  const ExpandedComponent = ({ data }: any) => (
    <div className="details">
      <p>
        <strong>Número:</strong> {data.number}
      </p>
      <p>
        <strong>Título:</strong> {data.title}
      </p>
      <p>
        <strong>Date:</strong> {data.date}
      </p>
      <p>
        <strong>Documento:</strong> <span  onClick={() => window.open(`${END_POINT}/uploads/${data.file}`)} style={{ cursor: 'pointer' }}><FiFile /></span>
      </p>
      {data.cancellationreason && (
        <p>
          <strong>Motivo do cancelamento:</strong> {data.cancellationreason}
        </p>
      )}
        {data.autorized_by && (
        <p>
          <strong>Autorizado por:</strong> {data.autorized_by}
        </p>
      )}
      {checkPermissionAutorized() && (data.autorized_by === null && data.canceled_by === null) && <div style={{ marginTop: 20 }}>
            <span onClick={() => promiseConfirm(data.id)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiThumbsUp size={22} /></span> 
            <span onClick={() => promiseCancel(data.id)}  className='icon-printer' style={{ marginLeft: '10px', cursor: 'pointer', color: '#ff4040'}}><FiThumbsDown size={22} /></span> 
          </div>}
    </div>
  );

  const checkPermissionAutorized = () => {
    if(user.userPermissions.find((item) => item.permisionid === 9)) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    promiseLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let promiseLoading = () => {
    try {
      api.get('/pops').then(response => {
        setData(response.data);
        
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        console.log(err.response);
        toast.error('Erro ao carregar os pops')
        return;
      }); 
    } catch (err) {
      toast.error('Erro ao carregar os pops')
      return;
    }
  }

  let promiseConfirm = (idPops: number) => {
    if(!window.confirm('Deseja Autorizar o POP?')) {
      return
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/pops/confirm', { id: idPops}).then(response => {
          promiseLoading();
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
        success: 'Sucesso ao Rejeitar 👌',
        error: 'Erro ao Rejeitar 🤯'
      }
    )
  }

  let promiseCancel = (idPops: number) => {
    if(!window.confirm('Deseja Rejeitar o POP?')) {
      return
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/pops/reject', { id: idPops}).then(response => {
          promiseLoading();
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
        success: 'Sucesso ao Autorizar 👌',
        error: 'Erro ao Autorizar 🤯'
      }
    )
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <SideBar page='pops' />
        <Body>
          <h1>
            POPs
          </h1>
          <button className="addColaborador" onClick={() => history.push('/scf/pops/add')}>Adicionar POP</button>
          <div className="table">
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={5}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </div>
        </Body>
      </Container>
    </>
  );
}

export default POPs;