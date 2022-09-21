import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import api from '../../../services/api';
import { Body, Container } from './styles';

import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiFile } from 'react-icons/fi';
import { END_POINT } from '../../../services/config';

interface InterfaceSector {
  id: number;  
  name: string;
}

const POPsPublic: React.FC = () => {
  const [data, setData] = useState<any>(undefined);
  
  const [dataSector, setDataSector] = useState<InterfaceSector[]>([]);
  
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
      name: "Ver",
      selector: (row: any) => <span  onClick={() => window.open(`${END_POINT}/uploads/${row.file}`)} style={{ cursor: 'pointer' }}><FiFile /></span>,
      sortable: true
    },
  ];

  const tableData = {
    columns,
    data,
  };

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
    </div>
  );

  useEffect(() => {
    promiseLoading();
    loadingSector();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let promiseLoading = () => {
    try {
      api.get('/pops/public').then(response => {
        setData(response.data);
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
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


  return (
    <>
      <ToastContainer />
      <Container>
        <Body>
          <h1>
            POPs Aprovados
          </h1>
        
          <div className="table">
            <DataTableExtensions
                {...tableData}
                filterPlaceholder="Pesquisar"
                print={false}
                export={false}
              >
              <DataTable
                columns={columns}
                data={data}
                pagination
                paginationPerPage={5}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />
            </DataTableExtensions>
          </div>
        </Body>
      </Container>
    </>
  );
}

export default POPsPublic;