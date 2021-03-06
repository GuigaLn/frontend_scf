import React, { useEffect, useState } from 'react';
import { Container, Body} from './styles';
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';

const TimeAttendance: React.FC = () => {
  const data2 = [{}];
  const history = useHistory();
  const { signOut } = useAuth();

  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "MATRÍCULA",
      selector: (row: any) => row.registration,
      sortable: true
    },
    {
      name: "NOME",
      selector: (row: any) => row.name,
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
        api.get('/employee/shortlist').then(response => {
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
    <>
    <ToastContainer />
      <Container>
        
        <SideBar page='timeattendance' />
        <Body>
          <h1>
            ÚSUARIO
          </h1>
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
                onRowDoubleClicked={(e: any) => { history.push(`/scf/timeattendance/detail/${e.id}`) }}
              />
            </DataTableExtensions>
          </div>
        </Body>
      </Container>
    </>
  );
}

export default TimeAttendance;