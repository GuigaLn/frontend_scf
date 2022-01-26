import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';


const ListVacation: React.FC = () => {
  const data2 = [{}];
  const [data, setData] = useState<any>(data2);
  const { signOut } = useAuth();

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
    {
      when: (row: any) => row.started === "false",
      style: {
        backgroundColor: 'rgb(255, 200, 200, 1)',
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