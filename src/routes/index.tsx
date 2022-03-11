import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route'

/* ROTA INICIAL */
import InitialRouter from '../pages/SCF/InitialRouter';

/* ROTAS DO SISTEMA DE TICKETS */
import InitialConfig from '../pages/SCF/InitialConfig';
import SecondConfig from '../pages/SCF/SecondConfig';
import CallTickets from '../pages/SCF/CallTickets';
import ResetTickets from '../pages/SCF/ResetTickets';

/* ROTAS DO SISTEMA DE FUNCIONÁRIOS */
import Panel from '../pages/Tickets/Panel';
import PanelConfig from '../pages/Tickets/PanelConfig';
import Dashboard from '../pages/SCF/Dashboard';
import City from '../pages/SCF/City';
import Occupation from '../pages/SCF/Occupation';
import UBS from '../pages/SCF/UBS';
import Comments from '../pages/SCF/Comments';
import TimeAttendance from '../pages/SCF/TimeAttendance';
import TimeAttendanceDetail from '../pages/SCF/TimeAttendanceDetail';
import Employee from '../pages/SCF/Employee';
import Login from '../pages/SCF/Login';
import EmployeeDetail from '../pages/SCF/EmployeeDetail';
import PDFPrinter from '../pages/SCF/PDFPrinter';
import Vacation from '../pages/SCF/Vacation';
import PrintEPI from '../pages/SCF/PrintEPI';
import ListVacation from '../pages/SCF/ListVacation';

/* ROTA DO CHAT DO WHATSAPP */
import Chat from '../pages/SCF/Chat';


const Routes: React.FC = () => {
  return (
    <Switch>
      
      <Route path="/" exact component={Login} />

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
      <Route path="/scf/employee" exact component={Employee} isPrivade />
      <Route path="/scf/employee/detail/:id" component={EmployeeDetail} isPrivade />
      <Route path="/scf/employee/vacation/:id" component={Vacation} isPrivade />
      <Route path="/scf/employee/listvacation" component={ListVacation} isPrivade />
      <Route path="/scf/employee/printepi/:id" component={PrintEPI} isPrivade />

      <Route path="/scf/chat" exact component={Chat} isPrivade />
      
    </Switch>
  );
}

export default Routes;

