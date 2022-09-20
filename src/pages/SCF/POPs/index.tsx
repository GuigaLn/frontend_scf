import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';
import { Body, Container, Modal } from './styles';

import { AxiosError } from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';

import { FiFile, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { END_POINT } from '../../../services/config';

interface InterfaceSector {
  id: number;  
  name: string;
}

const POPs: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  const { signOut, user } = useAuth();
  
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState('');
  const [file, setFile] = useState<any>(null);
  const [dataSector, setDataSector] = useState<InterfaceSector[]>([]);

  const handleChange = (file: any) => {
    setFile(file);
  };
  
  const columns: any = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true
    },
    {
      name: "Título",
      selector: (row: any) => row.title,
      sortable: true
    },
    {
      name: "Setor",
      selector: (row: any) => row.sector,
      sortable: true
    },
    {
      name: "Status",
      selector: (row: any) => row.autorized_by ? <div style={{ background: '#07d807', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>APROVADO</div> : row.canceled_by ? 
      <div style={{ background: '#d80a07', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>CANCELADO</div> : 
      <div style={{ background: '#d8ab07', borderRadius: 20, padding: '5px 20px', fontWeight: 'bold' }}>PENDENTE</div>,
      sortable: true
    },
    {
      name: "Ver",
      selector: (row: any) => <span  onClick={() => window.open(`${END_POINT}/uploads/${row.file}`)} style={{ cursor: 'pointer' }}><FiFile /></span>,
      sortable: true
    },
  ];

  const ExpandedComponent = ({ data }: any) => (
    <div className="details">
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Título:</strong> {data.title}
      </p>
      <p>
        <strong>Setor:</strong> {data.sector}
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
    loadingSector();
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

  let loadingSector = () => {
    try {
      api.get('/sector2').then(response => {
        setDataSector(response.data);
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

  let promiseAdd = () => {
    if(!file) {
      return toast.warning('Nenhum Arquivo Selecionado');
    }
    if(!title || title === '') {
      return toast.warning('Nenhum Título Definido');
    }
    if(!sector || sector === '') {
      return toast.warning('Nenhum Setor Definido');
    }
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        const data = new FormData();
        data.append('file', file[0]);
        data.append('title', title);
        data.append('sector', sector);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        api.post('/pops', data, config).then(response => { 
          setTimeout(resolve);
          setOpenModalAdd(false);
          promiseLoading();
          setFile(null);
          setTitle('');
          setSector('');
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
        success: 'Sucesso ao Cadastrar 👌',
        error: 'Erro ao Cadastrar 🤯'
      }
    )
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
          <button className="addColaborador" onClick={() => setOpenModalAdd(true)}>Adicionar POP</button>
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

      {openModalAdd &&
        <Modal>
          <div>
            <p>ADICIONAR POP</p>
            <input type="text"  onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Título" />
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={['PDF']}
              label="Selecione ou arraste o arquivo do POP"
            />
            <br />
            <span>{file ? `Nome do arquivo: ${file[0].name}` : "Nenhum arquivo selecionado"}</span>

            <div className="itemForm">
              <div className="titleInput">Setor</div>  
              <select onInput={(e) => setSector(e.currentTarget.value)}>
                <option>SELECIONE</option>
                {dataSector.map((sector) => (
                  sector.id === data.sectorid ?
                    <option key={sector.id} value={sector.id} selected>{sector.id} - {sector.name}</option>
                  : <option key={sector.id} value={sector.id}>{sector.id} - {sector.name}</option>
                ))}
              </select>
            </div>
            <button className="editar" onClick={promiseAdd}>CADASTRAR</button>
            <button className="cancelar" onClick={() => setOpenModalAdd(false)}>CANCELAR</button>
          </div>
        </Modal>
      }
    </>
  );
}

export default POPs;