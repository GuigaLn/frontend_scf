import React from 'react';
import { Container, Body} from './styles';
import DataTable from "react-data-table-component";
import SideBar from '../../../components/SideBar';


const Dashboard: React.FC = () => {
  return (
    <Container>

      <SideBar page='dashboard' />
      <Body>
        <h1>BEM VINDO AO SCF!</h1>
        <p>
          O Sistema de Controle de Funcionário tem como objetivo centralizar 
          e organizar os dados dos funcionários, bem como as batidas e o sistema
          de chamados de senha!
        </p>
      </Body>
    </Container>
  );
}

export default Dashboard;