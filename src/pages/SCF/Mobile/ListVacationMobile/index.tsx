import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import api from '../../../../services/api';
import { Body, Container } from './styles';

import { useHistory } from 'react-router-dom';

import { AxiosError } from 'axios';
import { FiPrinter } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../../context/AuthContext';


const ListVacationMobile: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState<any>();
  const { signOut, user } = useAuth();

  const conditionalRowStyles = [
    {
      when: (row: any) => row.autorizedby !== null && row.started === "true" && row.enjoyment === true,
      style: {
        backgroundColor: 'rgb(200, 255, 200, 1)',
        fontSize: '0.8rem',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row: any) => row.autorizedby !== null && row.enjoyment === false,
      style: {
        backgroundColor: 'rgb(200, 200, 255, 1)',
        fontSize: '0.8rem',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  const columns: any = [
    {
      name: "FUNCIONÁRIO",
      selector: (row: any) => row.name,
      sortable: true,
      minWidth: '200px',
      maxWidth: '200px'
    },
    {
      name: "",
      selector: (row: any) => {  
        return row.autorizedby === null &&
        <span style={{ color: 'red' }}>PENDENTE</span> 
      },
      sortable: true
    },
  ];

  const ExpandedComponent = ({ data }: any) => (
    <div className="vacation-details">
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Quantidade de dias:</strong> {data.daysperiod}
      </p>
      <p>
        <strong>Data Inicial:</strong> {data.dateinitial}
      </p>
      <p>
        <strong>Data final:</strong> {data.dateend}
      </p>
      {data.cancellationreason && (
        <p>
          <strong>Motivo do cancelamento:</strong> {data.cancellationreason}
        </p>
      )}
      {data.vacation ? <p>
          <strong>Férias - {data.enjoyment ? 'Com gozo' : 'Sem gozo'}</strong>
        </p> : <p>
          <strong>Licença prêmio</strong> 
        </p>}
        {data.discharge ? <p>
          <strong>Com quitação</strong>
        </p> : <p>
          <strong>Sem quitação</strong> 
        </p>}
        {data.autorizedby && (
        <p>
          <strong>Autorizado por:</strong> {data.autorizedbyname}
        </p>)}

        {user.userPermissions.find((item) => item.permisionid === 5) && (
        data.autorizedby === null ? 
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <span onClick={() => promiseConfirm(data.id)}  className='icon-printer' style={{ cursor: 'pointer', background: '#1E97F7', color: '#FFF', flexBasis: '40%', textAlign: 'center', padding: '20px', borderRadius: '5px'}}>Autorizar</span> 
          <span onClick={() => promiseCancel(data.id)}  className='icon-printer' style={{ cursor: 'pointer', background: '#ff4040', color: '#FFF', flexBasis: '40%', textAlign: 'center', padding: '20px', borderRadius: '5px'}}>Cancelar</span> 
        </div >
        : <div style={{ marginTop: '20px'}}>
            <span onClick={() => history.push(`/scf/employee/vacation/${data.id}`)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiPrinter size={22} /></span> 
          </div>
        )}
    </div>
  );

  useEffect(() => {
    promiseLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.get('/vacation').then(response => {
          setData(response.data);
          setTimeout(resolve);
          return;
        }).catch((err: AxiosError) => {
          if(err.response?.status === 401) {
            signOut();
            return;
          }
          console.log(err.response);
          setTimeout(reject);
          return;
        }); 
      } catch (err) {
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
      api.get('/vacation').then(response => {
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

  let promiseConfirm = (idVacation: number) => {
    if(!window.confirm('Deseja Autorizar o Pedido de Férias?')) {
      return
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/vacation/confirm', { id: idVacation}).then(response => {
          reloadData();
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

  let promiseCancel = (idVacation: number) => {
    if(!window.confirm('Deseja Rejeitar o Pedido de Férias?')) {
      return
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/vacation/reject', { id: idVacation}).then(response => {
          reloadData();
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
        <Body>
          <h1>
            FÉRIAS E LICENÇA PRÊMIO
          </h1>

          <div className="table">
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={30}
              conditionalRowStyles={conditionalRowStyles}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              expandOnRowClicked
            />
          </div>
        </Body>
      </Container>
    </>
  );
}

export default ListVacationMobile;