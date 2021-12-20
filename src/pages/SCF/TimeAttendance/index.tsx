import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

interface valueOccupation {
  id: number; 
  idemployee: number; 
  name: string;
}

const TimeAttendance: React.FC = () => {
  const data2 = [{}];
  const history = useHistory();

  const [data, setData] = useState<any>(data2);
  const columns: any = [
    {
      name: "ID",
      selector: "idemployee",
      sortable: true
    },
    {
      name: "NOME",
      selector: "name",
      sortable: true
    },
  ];

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

  return (
    <Container>
      <ToastContainer />
      <SideBar page='timeattendance' />
      <Body>
        <h1>
          ÚSUARIO
        </h1>
        <div className="table">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationPerPage={5}
            onRowDoubleClicked={(e: any) => { history.push(`/scf/timeattendance/detail/${e.id}`) }}
          />
        </div>
      </Body>
    </Container>
  );
}

export default TimeAttendance;