import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { Container } from './styles';

// @ts-ignore
import Printer from 'react-pdf-print';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import logo from '../../../assets/logo.png';
import { useAuth } from '../../../context/AuthContext';

interface Request {
  id: string;
}

const PrintEPI: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<Request>();
  const { signOut } = useAuth();
  
  const ids = ['printer'];

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cns, setCns] = useState('');
  const [occupation, setOccupation] = useState('');
  

  useEffect(() => {
    promiseLoading();
  }, []);

  let promiseLoading = () => {
    try {
      api.post('/employee/detailforepi', {id: Number(id)}).then(response => {
        if(response.data === undefined) { alert('Verifique se possui Únidade de Saúde, Nome, CNS, CPF e Ocupação!'); return history.push(`/scf/employee/detail/${id}`); }
        setName(response.data.name);
        setCns(response.data.cns);
        setCpf(response.data.cpf);
        setOccupation(response.data.occupation.toUpperCase());
        setTimeout(() => {
          window.print()
         }, 500);
        return;
      }).catch((err: AxiosError) => {
        if(err.response?.status === 401) {
          signOut();
          return;
        }
        alert('VERIFIQUE SE É DE SUA ÚNIDADE DE SAÚDE E SE POSSUÍ NOME, CNS, CPF e OCUPAÇÃO!');
        return history.push(`/scf/employee/detail/${id}`);
      }); 
    } catch (err) {
      return;
    }
  }

  return (
    <Container>
      <div className='App'>
       
        <Printer>
          <div id={ids[0]} className='printer' style={{ width:'210mm', height: '290mm' }}>

            <div className="header">
              <img src={logo} alt="Logo" />
              <h1>Ficha de Equipamento de Proteção Individual – EPI</h1>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nome: {name}</th>
                  <th>CPF: {cpf}</th>
                </tr>
                <tr>
                  <th>Função: {occupation}</th>
                  <th>CNS: {cns}</th>
                </tr>
                <tr>
                  <th colSpan={2}>Recebi da empresa Prefeitura Municipal de Cruz Machado - Paraná CNPJ: 76.339.688/0001-09, para meu uso obrigatório os EPI’s (Equipamento de Proteção Individual) constantes nesta ficha, o qual obrigo-me a utiliza-los corretamente durante o tempo que permanecer ao meu dispor, observando as medidas gerais de disciplina e uso integram a NR-06 Equipamento de Proteção Individual - EPI’s da portaria Nº 3,214 de 08 de Junho de 1978. Declaro saber também que terei que devolvê-los no ato do meu desligamento da empresa.</th>
                </tr>
              </thead>
            </table>

            <table>
              <thead>
                <tr className='text-align-center'>
                  <th colSpan={2}>Data</th>
                  <th style={{ width: '10%' }} rowSpan={2}>Quantidade</th>
                  <th style={{ width: '10%' }} rowSpan={2}>Unidade</th>
                  <th style={{ width: '30%' }} rowSpan={2}>Descrição do Equipamento</th>
                  <th style={{ width: '15%' }} rowSpan={2}>Nº C.A</th>
                  <th style={{ width: '25%' }} rowSpan={2}>Assinatura Funcionário</th>
                </tr>
                <tr>
                  <th style={{ width: '5%' }}>Retirada</th>
                  <th style={{ width: '5%' }}>Devolução</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Printer>
      </div>
    </Container>
  );
}

export default PrintEPI;