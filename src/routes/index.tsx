import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

/* ROTA INICIAL */

/* ROTAS DO SISTEMA DE TICKETS */
import CallTickets from '../pages/SCF/CallTickets';
import InitialConfig from '../pages/SCF/InitialConfig';
import ResetTickets from '../pages/SCF/ResetTickets';
import SecondConfig from '../pages/SCF/SecondConfig';

/* ROTAS DO SISTEMA DE FUNCIONÁRIOS */
import City from '../pages/SCF/City';
import Comments from '../pages/SCF/Comments';
import Dashboard from '../pages/SCF/Dashboard';
import Employee from '../pages/SCF/Employee';
import EmployeeDetail from '../pages/SCF/EmployeeDetail';
import ListVacation from '../pages/SCF/ListVacation';
import Login from '../pages/SCF/Login';
import Occupation from '../pages/SCF/Occupation';
import PDFPrinter from '../pages/SCF/PDFPrinter';
import PrintEPI from '../pages/SCF/PrintEPI';
import TimeAttendance from '../pages/SCF/TimeAttendance';
import TimeAttendanceDetail from '../pages/SCF/TimeAttendanceDetail';
import UBS from '../pages/SCF/UBS';
import Vacation from '../pages/SCF/Vacation';
import Panel from '../pages/Tickets/Panel';
import PanelConfig from '../pages/Tickets/PanelConfig';

/* ROTA DO CHAT DO WHATSAPP */
import Ponto from '../pages/Ponto';
import Chat from '../pages/SCF/Chat';
import Contact from '../pages/SCF/Contact';
import ListVacationMobile from '../pages/SCF/Mobile/ListVacationMobile';
import LoginMobile from '../pages/SCF/Mobile/LoginMobile';


const Routes: React.FC = () => {
  return (
    <Switch>
      
      <Route path="/" exact component={Login} />
      <Route path="/mobile" exact component={LoginMobile} />

      <Route path="/test" exact isPrivade component={PDFPrinter} />

      <Route path="/scf/ticket/initialconfig" isPrivade component={InitialConfig} />
      <Route path="/scf/ticket/secondconfig" isPrivade component={SecondConfig} />
      <Route path="/scf/ticket/calltickets" isPrivade component={CallTickets} />
      <Route path="/scf/ticket/resettickets" isPrivade component={ResetTickets} />

      <Route path="/panelconfig" component={PanelConfig} />
      <Route path="/panel" component={Panel} />

      <Route path="/scf" exact component={Login} />
      <Route path="/scf/dashboard" component={Dashboard} isPrivade />
      <Route path="/scf/city" component={City} isPrivade />
      <Route path="/scf/occupation" component={Occupation} isPrivade />
      <Route path="/scf/ubs" component={UBS} isPrivade />
      <Route path="/scf/comments" component={Comments} isPrivade />
      <Route path="/scf/timeattendance" exact component={TimeAttendance} isPrivade />
      <Route path="/scf/timeattendance/detail/:id" component={TimeAttendanceDetail} isPrivade />
      <Route path="/scf/contact" exact component={Contact} isPrivade />
      <Route path="/scf/employee" exact component={Employee} isPrivade />
      <Route path="/scf/employee/detail/:id" component={EmployeeDetail} isPrivade />
      <Route path="/scf/employee/vacation/:id" component={Vacation} isPrivade />
      <Route path="/scf/employee/listvacation" component={ListVacation} isPrivade />
      <Route path="/scf/employee/printepi/:id" component={PrintEPI} isPrivade />
      
      <Route path="/scf/chat" exact component={Chat} isPrivade />
      

      <Route path="/scf/mobile/employee/listvacation" component={ListVacationMobile} isPrivade />

      <Route path="/ponto" component={Ponto} />
    </Switch>
  );
}

export default Routes;

