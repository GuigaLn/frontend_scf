import React, { useEffect, useState } from 'react';
import { SideBar} from './styles';
import { FiClock, FiMap, FiBriefcase, FiKey, FiAlertCircle, FiMenu, FiHome, FiLogOut, FiCast, FiSun, FiMessageCircle, FiUser } from 'react-icons/fi';

import logo from '../../assets/logo2.png';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    page: string;
}


const Dashboard: React.FC<SidebarProps> = ({ page }) => {
    const history = useHistory();
    const { signOut, user } = useAuth();
    const [close, setClose] = useState(true);
    /*
    1 = total
    2 = ponto
    3 = senhas
    */
    const [ all, setAll ] = useState(-1);
    const [ tickets, setTickets ] = useState(-1);
    const [ timeAttedance, setTimeAttedance ] = useState(-1);
    const [ employee, setEmployee ] = useState(-1);
    const [ callCenter, setCallCenter ] = useState(-1);

    useEffect(() => {
        if(user.userPermissions.findIndex((item) => item.permisionid === 1) !== -1) {
            setTickets(1);
            setTimeAttedance(1);
            setAll(1);
            setEmployee(1);
            setCallCenter(1);
        }
        if(user.userPermissions.findIndex((item) => item.permisionid === 2) !== -1) setTimeAttedance(1);
        if(user.userPermissions.findIndex((item) => item.permisionid === 3) !== -1) setTickets(1);
        if(user.userPermissions.findIndex((item) => item.permisionid === 4) !== -1) setEmployee(1);
        if(user.userPermissions.findIndex((item) => item.permisionid === 6) !== -1) setCallCenter(1);
    }, [user.userPermissions]);
    return (
        <SideBar close={close}>
            <div className="navbar">
                <div className="header">
                    <img src={logo} alt="Logo" />
                    <strong >SCF - SMS</strong>
                    <FiMenu size={20} style={{ cursor: 'pointer'}} onClick={() => setClose(!close)} />
                </div>

                <div className="body">                
                    <div className={ page === 'dashboard' ? "option select" : 'option' } onClick={() => history.push('/scf/dashboard')}>
                        <FiHome />
                        <span>Dashboard</span>
                    </div>

                    { // VERIFICAR SE TEM PERMIS??O DE INTERAGIR COM OS FUNCION??RIOS
                    employee !== -1 ? 
                        <div className={ page === 'employee' ? "option select" : 'option' } onClick={() => history.push('/scf/employee')}>
                            <FiUser />
                            <span>Funcion??rios</span>
                        </div> :<></>
                    }

                    { // VERIFICAR SE TEM PERMIS??O DE VER O PONTO
                    timeAttedance !== -1 ? 
                        <div className={ page === 'timeattendance' ? "option select" : 'option' } onClick={() => history.push('/scf/timeattendance')}>
                            <FiClock />
                            <span>Batidas</span>
                        </div> :<></>
                    }
                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    employee !== -1 ?
                        <div className={ page === 'vacation' ? "option select" : 'option' } onClick={() => history.push('/scf/employee/listvacation')}>
                            <FiSun />
                            <span>F??rias e Licen??as</span>
                        </div> :<></>
                    }
                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    callCenter !== -1 ?
                        <div className={ page === 'chat' ? "option select" : 'option' } onClick={() => history.push('/scf/chat')}>
                            <FiMessageCircle />
                            <span>Chat</span>
                        </div> :<></>
                    }
                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    all !== -1 ?
                        <div className={ page === 'comments' ? "option select" : 'option' } onClick={() => history.push('/scf/comments')}>
                            <FiAlertCircle />
                            <span>Observa????es Ponto</span>
                        </div> :<></>
                    }

                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    all !== -1 ?
                        <div className={ page === 'city' ? "option select" : 'option' } onClick={() => history.push('/scf/city')}>
                            <FiMap />
                            <span>Cidades</span>
                        </div> :<></>
                    }

                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    all !== -1 ?
                        <div className={ page === 'occupation' ? "option select" : 'option' } onClick={() => history.push('/scf/occupation')}>
                            <FiBriefcase />
                            <span>Ocupa????es</span>
                        </div> :<></>
                    }

                    { // VERIFICAR SE TEM PERMIS??O TOAL
                    all !== -1 ?
                        <div className={ page === 'ubs' ? "option select" : 'option' } onClick={() => history.push('/scf/ubs')}>
                            <FiKey />
                            <span>??nidade</span>
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
            </div>
        </SideBar>
    );
}

export default Dashboard;