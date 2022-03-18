import React from 'react';
import { Container, Body} from './styles';
import SideBar from '../../../components/SideBar';


const Dashboard: React.FC = () => {
  return (
    <>
      <Container>
        <SideBar page='dashboard' />
        <Body>
          <h1>LINKS ÚTEIS</h1>
        </Body>
      </Container>
    </>
  );
}

export default Dashboard;