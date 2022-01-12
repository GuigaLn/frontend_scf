import React, { useEffect, useState } from 'react';
import { SideBar} from './styles';
import { FiClock, FiPieChart, FiMap, FiBriefcase, FiKey, FiAlertCircle, FiMenu, FiHome, FiLogOut, FiCast } from 'react-icons/fi';

import logo from '../../assets/logo2.png';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    page: string;
}


const Dashboard: React.FC<SidebarProps> = ({ page }) => {
    const history = useHistory();
    const { signOut, user } = useAuth();

    /*
    1 = total
    2 = ponto
    3 = senhas
    */
    const [ all, setAll ] = useState(-1);
    const [ tickets, setTickets ] = useState(-1);
    const [ timeAttedance, setTimeAttedance ] = useState(-1);

    useEffect(() => {
        console.log(user.userPermissions.findIndex((item) => item.permisao_id === 1))
        if(user.userPermissions.findIndex((item) => item.permisao_id === 1) !== -1) {
            console.log(1)
            setTickets(1);
            setTimeAttedance(1);
            setAll(1);
        }
        if(user.userPermissions.findIndex((item) => item.permisao_id === 2) !== -1) setTimeAttedance(1);
        if(user.userPermissions.findIndex((item) => item.permisao_id === 3) !== -1) setTickets(1);
    })
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

                { // VERIFICAR SE TEM PERMISÃO DE VER O PONTO
                timeAttedance !== -1 ? 
                    <div className={ page === 'timeattendance' ? "option select" : 'option' } onClick={() => history.push('/scf/timeattendance')}>
                        <FiClock />
                        <span>Batidas</span>
                    </div> :<></>
                }
                
                { // VERIFICAR SE TEM PERMISÃO TOAL
                 all !== -1 ?
                    <div className="option">
                        <FiPieChart />
                        <span>Relatórios</span>
                    </div> :<></>
                }

                { // VERIFICAR SE TEM PERMISÃO TOAL
                 all !== -1 ?
                    <div className={ page === 'comments' ? "option select" : 'option' } onClick={() => history.push('/scf/comments')}>
                        <FiAlertCircle />
                        <span>Observações Ponto</span>
                    </div> :<></>
                }

                { // VERIFICAR SE TEM PERMISÃO TOAL
                 all !== -1 ?
                    <div className={ page === 'city' ? "option select" : 'option' } onClick={() => history.push('/scf/city')}>
                        <FiMap />
                        <span>Cidades</span>
                    </div> :<></>
                }

                { // VERIFICAR SE TEM PERMISÃO TOAL
                 all !== -1 ?
                    <div className={ page === 'occupation' ? "option select" : 'option' } onClick={() => history.push('/scf/occupation')}>
                        <FiBriefcase />
                        <span>Ocupações</span>
                    </div> :<></>
                }

                { // VERIFICAR SE TEM PERMISÃO TOAL
                 all !== -1 ?
                    <div className={ page === 'ubs' ? "option select" : 'option' } onClick={() => history.push('/scf/ubs')}>
                        <FiKey />
                        <span>Únidade</span>
                    </div> :<></>
                }

                { 
                 tickets !== -1 ?
                    <div className={ page === 'panel' ? "option select" : 'option' } onClick={() => history.push('/scf/ticket/initialconfig')}>
                        <FiCast />
                        <span>Painel</span>
                    </div> :<></>
                }

                <div className="option" onClick={() => signOut()}>
                    <FiLogOut />
                    <span>Sair</span>
                </div>
            </div>
        </SideBar>
    );
}

export default Dashboard;