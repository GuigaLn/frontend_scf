import React, { useState } from 'react';
import { SideBar} from './styles';
import { FiClock, FiPieChart, FiMap, FiBriefcase, FiKey, FiAlertCircle, FiMenu, FiHome } from 'react-icons/fi';

import logo from '../../assets/logo2.png';
import { useHistory } from 'react-router';

interface SidebarProps {
    page: string;
}

const Dashboard: React.FC<SidebarProps> = ({ page }) => {
    const history = useHistory();

    return (
        <SideBar>
            <div className="header">
                <img src={logo} alt="Logo" />
                <strong>SCF - SMS</strong>
                <FiMenu size={20} />
            </div>

            <div className="body">
                <button onClick={() => history.push('/scf/employee')}>Colaboradores</button>
                
                <div className={ page === 'dashboard' ? "option select" : 'option' } onClick={() => history.push('/scf/dashboard')}>
                    <FiHome />
                    <span>Dashboard</span>
                </div>

                <div className={ page === 'timeattendance' ? "option select" : 'option' } onClick={() => history.push('/scf/timeattendance')}>
                    <FiClock />
                    <span>Batidas</span>
                </div>
                
                <div className="option">
                    <FiPieChart />
                    <span>Relatórios</span>
                </div>

                <div className={ page === 'comments' ? "option select" : 'option' } onClick={() => history.push('/scf/comments')}>
                    <FiAlertCircle />
                    <span>Observações Ponto</span>
                </div>

                <div className={ page === 'city' ? "option select" : 'option' } onClick={() => history.push('/scf/city')}>
                    <FiMap />
                    <span>Cidades</span>
                </div>

                <div className={ page === 'occupation' ? "option select" : 'option' } onClick={() => history.push('/scf/occupation')}>
                    <FiBriefcase />
                    <span>Ocupações</span>
                </div>

                <div className={ page === 'ubs' ? "option select" : 'option' } onClick={() => history.push('/scf/ubs')}>
                    <FiKey />
                    <span>Únidade</span>
                </div>
            </div>
        </SideBar>
    );
}

export default Dashboard;