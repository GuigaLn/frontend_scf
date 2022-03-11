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
import { AxiosError } from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { FiThumbsUp } from 'react-icons/fi';

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
  const { signOut } = useAuth();

  const [startDay, setStartDay] = useState(''); 
  const [endDay, setEndDay] = useState(''); 

  const [nameEmployee, setNameEmployee] = useState('');
  const [sumHours, setSumHours] = useState('');
  const [minWorkTime, setMinWorkTime] = useState('');

  const [detailUpdate, setDetailUpdate] = useState<any>();
  const [idComments, setIdComments] = useState<any>();

  const [comments, setComments] = useState<InterfaceComments[]>([]);
  const { id } = useParams<Request>();
  const [openModal, setOpenModal] = useState(false);

  const conditionalRowStyles = [
    {
      when: (row: any) => row.week === 'Sab',
      style: {
        backgroundColor: 'rgb(200, 255, 200, 1)',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row: any) => row.week === 'Dom',
      style: {
        backgroundColor: 'rgb(200, 200, 255, 1)',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

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
    {
      name: "SOMA",
      selector: "sum",
      sortable: true
    },
    {
      name: "VALIDADO",
      selector: (row: any) => {
      if(row.id === undefined) {
        return '';
      } else { 
        if(!row.valided) {
          return <span onClick={() => validedTimeAttendance(row.id)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiThumbsUp size={22} /></span> 
        } else {
          return <span style={{ color: 'green' }}>OK</span>
        }
      }},
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
    if(startDay !== '' && startDay !== null) { return }
    if(endDay !== '' && endDay !== null) { return }
    new Promise((resolve, reject) => {
      try {
        api.post('time/detail', {id}).then(response => {
          setMinWorkTime(response.data.times.minWorkTime);
          setData(response.data.times.list);
          if(response.data.customer) {
            setNameEmployee(response.data.customer);
          }
          setSumHours(response.data.times.sumHours);
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
        api.post('time/detail', {id, startDay, endDay}).then(response => {
          setMinWorkTime(response.data.times.minWorkTime);
          setData(response.data.times.list);
          if(nameEmployee === '') {
            setNameEmployee(response.data.customer);
            console.log(nameEmployee)
          }
          setSumHours(response.data.times.sumHours);
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

  let validedTimeAttendance = (idTimeAttendance: number) => {
    if (idTimeAttendance === undefined && idTimeAttendance === null) return;
    try {
      api.put('time/valided', {id: idTimeAttendance}).then(response => {
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
  }

  return (
    <>
      <ToastContainer />
      <Container>
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
              title={nameEmployee}
                columns={columns}
                data={data}
                pagination
                paginationPerPage={32}
                onRowDoubleClicked={(e: any) => 
                {
                  setOpenModal(true); 
                  setDetailUpdate({id: e.id, idEmployee: e.id_funcionario, date: e.day}); 
                  setIdComments(undefined) 
                }}
                conditionalRowStyles={conditionalRowStyles}
              />
            </DataTableExtensions>
          </div>
          <h3>TOTAL: {sumHours} - MÍNIMO: {minWorkTime}</h3>
        </Body>
      </Container>

      {openModal &&
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
      }
    </>
  );
}

export default TimeAttendanceDetail;