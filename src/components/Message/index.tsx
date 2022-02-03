import React, { useState } from 'react'; 
import { FiXCircle } from 'react-icons/fi';

import { Container } from './style';

interface SidebarProps {
    msg: string;
    typeMessage: number;
    created_at: string
}


const Audio: React.FC<SidebarProps> = ({ msg, typeMessage, created_at }) => { 
    const [openModalImage, setOpenModalImage] = useState(false);
    
    function handdleScreen() {
        if(openModalImage === true) {
            setOpenModalImage(false)
        } else {
            setOpenModalImage(true);
        }
    }

    if(typeMessage === 2) {
        return <Container  onClick={() => handdleScreen()} className={openModalImage ? 'open' : ''}>
            <img src={`http://localhost:3332/upload/${msg}`}/>
        </Container>
    } else if (typeMessage === 3) {
        return <video style={{height: "200px"}} src={`http://localhost:3332/upload/${msg}`}  controls></video>
    } else if(typeMessage === 4 ) {
        return <audio
            src={`http://localhost:3332/upload/${msg}`}
            controls
        />
    } else {
        return <div>
            <strong>{msg}</strong>
            <span>{created_at}</span>
        </div>
    }
}

export default Audio;