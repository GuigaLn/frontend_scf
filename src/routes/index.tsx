import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route'

import InitialConfig from '../pages/Tickets/InitialConfig';
import SecondConfig from '../pages/Tickets/SecondConfig';
import CallTickets from '../pages/Tickets/CallTickets';
import ResetTickets from '../pages/Tickets/ResetTickets';

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

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={InitialConfig} />
      <Route path="/second" component={SecondConfig} />
      <Route path="/calltickets" component={CallTickets} />
      <Route path="/resettickets" component={ResetTickets} />

      <Route path="/panelconfig" component={PanelConfig} />
      <Route path="/panel" component={Panel} />
      <Route path="/scf/dashboard" component={Dashboard} />
      <Route path="/scf/city" component={City} />
      <Route path="/scf/occupation" component={Occupation} />
      <Route path="/scf/ubs" component={UBS} />
      <Route path="/scf/comments" component={Comments} />
      <Route path="/scf/timeattendance" exact component={TimeAttendance} />
      <Route path="/scf/timeattendance/detail/:id" component={TimeAttendanceDetail} />
      <Route path="/scf/employee" component={Employee} />
      
    </Switch>
  );
}

export default Routes;

