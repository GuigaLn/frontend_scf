import React, { useEffect, useState } from 'react';
import { Container, Body, Modal} from './styles';
import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import SideBar from '../../../components/SideBar';
import api from '../../../services/api';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface Request {
  id: string;
}

interface InterfaceComments {
  id: number,
  description: string
}

const TimeAttendanceDetail: React.FC = () => {
  const data2 = [{}];
  const [data, setData] = useState<any>(data2);

  const [startDay, setStartDay] = useState(''); 
  const [endDay, setEndDay] = useState(''); 

  const [detailUpdate, setDetailUpdate] = useState<any>();
  const [idComments, setIdComments] = useState<any>();

  const [comments, setComments] = useState<InterfaceComments[]>([]);
  const { id } = useParams<Request>();
  const [openModal, setOpenModal] = useState(false);

  const columns: any = [
    {
      name: "Data",
      selector: "day",
      sortable: true
    },
    {
      name: "Sem",
      selector: "week",
      sortable: true
    },
    {
      name: "1º Entrada",
      selector: "one",
      sortable: true
    },
    {
      name: "2º Entrada",
      selector: "oneout",
      sortable: true
    },
    {
      name: "3º Entrada",
      selector: "two",
      sortable: true
    },
    {
      name: "4º Entrada",
      selector: "twoout",
      sortable: true
    },
    {
      name: "OBS",
      selector: "obs",
      sortable: true
    },
  ];

  const tableData = {
    columns,
    data,
  };
  
  useEffect(() => {
    promiseLoadingData();
    promiseLoadingComments();
  }, []);

  let promiseLoadingData = () => {
   
   new Promise((resolve, reject) => {
      try {
        api.post('timee', {id}).then(response => {
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
  }

  let promiseLoadingComments = () => {
    try {
      api.get('/comments').then(response => {
        setComments(response.data)
        return;
      }).catch((err) => {
        console.log(err);
        return;
      }); 
    } catch (err) {
      console.log(err);      
    }
  }

  let loadingWithData = () => {
   if (startDay === '' || endDay === '') return;
    new Promise((resolve, reject) => {
      try {
        api.post('timee', {id, startDay, endDay}).then(response => {
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
  }
  
  let submitComments = () => {
    if (detailUpdate.id === undefined && idComments === undefined) return;
     new Promise((resolve, reject) => {
       try {
         api.put('time', {id: detailUpdate.id, note: idComments, date: detailUpdate.date, idEmployee: detailUpdate.idEmployee}).then(response => {
           promiseLoadingData();
           setOpenModal(false);
           return;
         }).catch((err) => {
           console.log(err);
           return;
         }); 
       } catch (err) {
         console.log(err);
         return;
       }
     });
   }

  return (
    <Container>

      <ToastContainer />
      <SideBar page='timeattendance' />
      
      <Body>
        <div className="findForDate">
          <div>
            <div>
              <span>Data Inicial: </span>
              <input type="date" onChange={(e) => setStartDay(e.currentTarget.value)} />
            </div>

            <div>
              <span>Data Final: </span>
              <input type="date"  onChange={(e) => setEndDay(e.currentTarget.value)} />
            </div>
          </div>
          <button className="loadingData" onClick={loadingWithData} >CARREGAR DADOS</button>
        </div>
        
        <div className="table">
          <DataTableExtensions
            {...tableData}
            exportHeaders={true}
          >
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={31}
              onRowDoubleClicked={(e: any) => 
                {
                  setOpenModal(true); 
                  setDetailUpdate({id: e.id, idEmployee: e.id_funcionario, date: e.day}); 
                  setIdComments(undefined) 
                }}
            />
          </DataTableExtensions>
        </div>
      </Body>

      {openModal ?
        <Modal>
          <div>
            <p>LANÇAR OBSERVAÇÃO</p>
            <select
              onChange={(e): void => setIdComments(e.target.value)}
              required
            > 
              <option>SELECIONE:</option>
              <option value={1}>SEM OBSERVAÇÃO</option>
              {comments.map(item => (
                  <option key={item.id} value={item.id}>{item.description}</option>
              ))}
            </select>
            <button className="submit" onClick={submitComments}>LANÇAR</button>
            <button className="cancelar" onClick={() => setOpenModal(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }
    </Container>
  );
}

export default TimeAttendanceDetail;