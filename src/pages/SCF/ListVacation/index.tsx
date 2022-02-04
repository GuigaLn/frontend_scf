import React, { useEffect, useState } from 'react';
import { Container, Body } from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';
import { FiPrinter, FiThumbsUp } from 'react-icons/fi';


const ListVacation: React.FC = () => {
  const history = useHistory();
  const [data, setData] = useState<any>();
  const { signOut, user } = useAuth();

  const conditionalRowStyles = [
    {
      when: (row: any) => row.started === "true",
      style: {
        backgroundColor: 'rgb(200, 255, 200, 1)',
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
      minWidth: '300px',
      maxWidth: '300px'
    },
    {
      name: "TIPO",
      selector: (row: any) => { if(row.vacation) { return 'FÉRIAS'} else { return 'LICENÇA PRÊMIO'} },
      sortable: true,
    },
    {
      name: "DATA INICIAL",
      selector: (row: any) => row.dateinitial,
      sortable: true
    },
    {
      name: "DATA FINAL",
      selector: (row: any) => row.dateend,
      sortable: true
    },
    {
      name: "TOTAL DE DIAS",
      selector: (row: any) => row.daysperiod,
      sortable: true
    },
    {
      name: "VISUALIZAR",
      selector: (row: any) => {  
        if(user.id_unidade_de_saude === 9) { 
          return row.autorizedby === null ? 
          <span onClick={() => promiseEdit(row.id)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiThumbsUp size={22} /></span> 
          : <span onClick={() => history.push(`/scf/employee/vacation/${row.id}`)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiPrinter size={22} /></span> 
        } 
        else {
          return row.autorizedby !== null ? 
          <span onClick={() => history.push(`/scf/employee/vacation/${row.id}`)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiPrinter size={22} /></span> 
          : <span style={{ color: 'red' }}>PENDENTE</span> 
        } 
      },
      sortable: true
    },
  ];

  useEffect(() => {
    promiseLoading();
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

  let promiseEdit = (idVacation: number) => {
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

  return (
    <Container>
      <ToastContainer />
      <SideBar page='vacation' />
      <Body>
        <h1>
          FÉRIAS E LICENÇA PRÊMIO
        </h1>

        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationPerPage={5}
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
      </Body>
    </Container>
  );
}

export default ListVacation;