import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route'

import InitialRouter from '../pages/SCF/InitialRouter';

import InitialConfig from '../pages/SCF/InitialConfig';
import SecondConfig from '../pages/SCF/SecondConfig';
import CallTickets from '../pages/SCF/CallTickets';
import ResetTickets from '../pages/SCF/ResetTickets';

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


const Routes: React.FC = () => {
  return (
    <Switch>
      
      <Route path="/resettickets" component={ResetTickets} />

      <Route path="/" exact component={InitialRouter} />

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
      
    </Switch>
  );
}

export default Routes;

