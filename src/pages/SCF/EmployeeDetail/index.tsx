import React, { useCallback, useEffect, useState } from 'react';
import { Container, Body, Modal } from './styles';
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPrinter, FiUser } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AxiosError } from 'axios';

interface Request {
  id: string;
}

interface InterfaceEmployee {
  id: number
  name: string
  bedit: string
  birthday: string
  cpf: string
  cns: string
  registration: any
  numberct: string
  seriesct: string
  mail: string
  phone: string
  ubsid: number
  occupationid: number
}

interface InterfaceUBS {
  id: number; 
  idubs: number; 
  description: string;
}

interface InterfaceOccupation {
  id: number; 
  idoccupation: number; 
  description: string;
}

const EmployeeDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Request>();
  const { user, signOut } = useAuth();

  let [data, setData] = useState<InterfaceEmployee>({id: 0, name: '', bedit: '', birthday: '', cpf: '', cns: '', registration: '', numberct: '', seriesct: '', mail: '', phone: '', ubsid: 0, occupationid: 0});

  const [dataUBS, setDataUBS] = useState<InterfaceUBS[]>([]);
  const [dataOccupation, setDataOccupation] = useState<InterfaceOccupation[]>([]);
  const [openModalVacation, setOpenModalVacation] = useState(false);

  const [discharge, setDischarge] = useState('gozo');
  const [vacation, setVacation] = useState('vacation')
  const [vestingPeriod, setVestingPeriod] = useState('');
  const [daysPeriod, setDaysPeriod] = useState('');
  const [dateInitial, setDateInitial] = useState('');

  const [dataListVacation, setDataListVacation] = useState<any>();
  const columns: any = [
    {
      name: "TIPO",
      selector: (row: any) => { if(row.vacation) { return 'FÉRIAS'} else { return 'LICENÇA PRÊMIO'} },
      sortable: true,
    },
    {
      name: "PERÍODO AQUISITIVO",
      selector: (row: any) => row.vestingperiod,
      sortable: true,
    },
    {
      name: "DATA INICIAL",
      selector: (row: any) => row.dateinitial,
      sortable: true,
      minWidth: '300px',
      maxWidth: '300px'
    },
    {
      name: "DATA FINAL",
      selector: (row: any) => row.dateend,
      sortable: true
    },
    {
      name: "VISUALIZAR",
      selector: (row: any) =>  row.autorizedby !== null ? 
        <span onClick={() => history.push(`/scf/employee/vacation/${row.id}`)}  className='icon-printer' style={{ cursor: 'pointer', color: '#1E97F7'}}><FiPrinter /></span> 
        : <span style={{ color: 'red' }}>PENDENTE</span>,
      sortable: true
    },
  ];

  const tableData = {
    columns,
    data: dataListVacation,
  };

  useEffect(() => {
    promiseLoading();
    loadingUBS();
    loadingOccupation();
    loadingListVacation();
  }, []);

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/employee/detail', {id}).then(response => {
          if(response.data[0] === undefined) { return history.push('/scf/employee') }
          setData(response.data[0]);
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

  let promiseEdit = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      data.id = Number(id);
      try {
        api.put('/employee', {data}).then(response => {
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
        success: 'Sucesso ao Editar 👌',
        error: 'Erro ao Editar 🤯'
      }
    )
  }

  let loadingUBS = () => {
    try {
      api.get('/ubs').then(response => {
        setDataUBS(response.data);
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

  let loadingOccupation = () => {
    try {
      api.get('/occupation').then(response => {
        setDataOccupation(response.data);
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
  
  let loadingListVacation = () => {
    try {
      api.post('/vacation/listByEmployee', { idEmployee: id }).then(response => {
        setDataListVacation(response.data);
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

  let emitVacation = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      data.id = Number(id);
      let vacationBoolean;
      let dischargeBoolean;
      let enjoymentBoolean;
      
      // VERIFICA SE É FÉRIAS OU LICENÇA PRÊMIO
      if(vacation === 'vacation') { vacationBoolean = true} else { vacationBoolean = false }

      // VERIFICA O TIPO
      if(discharge === 'gozo') { 
        enjoymentBoolean = true; dischargeBoolean = false 
      }
      else if(discharge === 'gozo_quitacao') { enjoymentBoolean = true; dischargeBoolean = true } 
      else if(discharge === 'quitacao') { enjoymentBoolean = false; dischargeBoolean = true } 

      try {
        api.post('/vacation', { vacation: vacationBoolean, enjoyment: enjoymentBoolean, discharge: dischargeBoolean, vestingPeriod, daysPeriod: Number(daysPeriod), dateInitial, idEmployee: Number(id), idOccupation: data.occupationid, idSystemUser: user.id}).then(response => {
          setTimeout(resolve); 
          setDischarge('gozo');
          setVacation('vacation');
          setVestingPeriod('');
          setDaysPeriod('');
          setDateInitial('');
          loadingListVacation();
          setOpenModalVacation(false);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          return;
        }); 
      } catch (err: any) {
        console.log(err.data);
        setTimeout(reject);
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

  return (
    <Container>
      <ToastContainer />
      <SideBar page='employee' />
      <Body>
        <div className="header">
          <h1><FiUser /> CADASTRO DO USÚARIO</h1>
        </div>        

        <h2>DADOS</h2>
        <div className="form">
          <div className="itemForm">
            <div className="titleInput">Nome</div>  
            <input type="text" defaultValue={data.name} onInput={(e) => data.name = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">Data Nascimento</div>  
            <input type="date" defaultValue={data.bedit} onInput={(e) => data.birthday = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">CPF</div>  
            <input type="text" defaultValue={data.cpf} onInput={(e) => data.cpf = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">CNS</div>  
            <input type="text" defaultValue={data.cns} onInput={(e) => data.cns = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">Matricula</div>  
            <input type="number" defaultValue={data.registration} onInput={(e) => data.registration = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">Número Carteira</div>  
            <input type="text" defaultValue={data.numberct} onInput={(e) => data.numberct = e.currentTarget.value} />
          </div>

          <div className="itemForm">
            <div className="titleInput">Série Carteira</div>  
            <input type="text" defaultValue={data.seriesct} onInput={(e) => data.seriesct = e.currentTarget.value}  />
          </div>

          <div className="itemForm">
            <div className="titleInput">Telefone</div>  
            <input type="text" defaultValue={data.phone} onInput={(e) => data.phone = e.currentTarget.value}  />
          </div>

          <div className="itemForm">
            <div className="titleInput">E-mail</div>  
            <input type="text" defaultValue={data.mail} onInput={(e) => data.mail = e.currentTarget.value}  />
          </div>

          <div className="itemForm">
            <div className="titleInput">Únidade de Saúde</div>  
            <select onInput={(e) => data.ubsid = Number(e.currentTarget.value)}>
              <option>SELECIONE</option>
              {dataUBS.map((ubs) => (
                ubs.id === data.ubsid ?
                  <option key={ubs.id} value={ubs.id} selected>{ubs.id} - {ubs.description}</option>
                : <option key={ubs.id} value={ubs.id}>{ubs.id} - {ubs.description}</option>
              ))}
            </select>
          </div>

          <div className="itemForm">
            <div className="titleInput">Ocupação</div>  
            <select onInput={(e) => data.occupationid = Number(e.currentTarget.value)}>
              <option>SELECIONE</option>
              {dataOccupation.map((occupation) => (
                occupation.id === data.occupationid ?
                  <option key={occupation.id} value={occupation.id} selected>{occupation.id} - {occupation.description}</option>
                : <option key={occupation.id} value={occupation.id}>{occupation.id} - {occupation.description}</option>
              ))}
            </select>
          </div>
        </div>    

        <button className="editar" onClick={promiseEdit}>EDITAR DADOS</button>

        <button className="editar" onClick={() => history.push(`/scf/employee/printepi/${id}`)}>GERAR FICHA - EPI</button>

        <hr />
        <button className="emit-vacation" onClick={() => setOpenModalVacation(true)}>EMITIR FÉRiAS</button>

        <div className="table">
          <DataTableExtensions
            {...tableData}
            exportHeaders={true}
          >
            <DataTable
              columns={columns}
              data={dataListVacation}
              pagination
              paginationPerPage={30}
              onRowDoubleClicked={(e: any) => {history.push(`employee/detail/${e.id}`) }}
            />
          </DataTableExtensions>
        </div>

        <hr />
      </Body>

  
      {openModalVacation ?
        <Modal>
          <div>
            <p>ADICIONAR FÉRIAS</p>
            <div className="titleInput"> Período Aquisitivo *</div>
            <input onInput={(e) => setVestingPeriod(e.currentTarget.value)} type="text" placeholder="2019/2020" />

            <div className="titleInput"> Tipo do Pedido *</div>
            <select name="vacation" id="vacation" defaultValue="vacation" onInput={(e) => setVacation(e.currentTarget.value)}>
              <option value="vacation" selected>Férias</option>
              <option value="license_award">Licença Especial a Título Prêmio</option>
            </select>

            <div className="titleInput"> Tipo de Requerimento *</div>
            <select name="vacation" id="vacation" defaultValue='gozo' onInput={(e) => setDischarge(e.currentTarget.value)}>
              <option value="gozo">Gozo</option>
              <option value="gozo_quitacao">Gozo e Quitação</option> 
              <option value="quitacao">Quitação</option>
            </select>

            <div className="titleInput"> Período em Dias *</div>
            <input onInput={(e) => setDaysPeriod(e.currentTarget.value)} type="text" placeholder="15" />

            <div className="titleInput"> Data Inicial *</div>
            <input onInput={(e) => setDateInitial(e.currentTarget.value)} type="date" />

            <button className="editar" onClick={emitVacation}>GRAVAR</button>
            <button className="cancelar" onClick={() => setOpenModalVacation(false)}>CANCELAR</button>
          </div>
        </Modal>
        : <></>
      }
    </Container>
  );
}

export default EmployeeDetail;