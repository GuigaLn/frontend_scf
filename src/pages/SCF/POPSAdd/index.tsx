import React, { useState } from 'react';
import SideBar from '../../../components/SideBar';
import { Body, Container } from './styles';

import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../services/api';

const POPSAdd: React.FC = () => {
  const history = useHistory();
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [version, setVersion] = useState('');
  const [performer, setPerformer] = useState('');
  const [zone, setZone] = useState('');
  const [objective, setObjective] = useState('');
  const [madeBy, setMadeBy] = useState('');
  const [reviewedBy, setReviewedBy] = useState('');

  let promiseAdd = () => {
    if(!title || title === '') {
      return toast.warning('Nenhum Título Definido');
    }

    try {
      api.post('/pops', { title, number, version, performer, zone, objective, madeBy, reviewedBy, content }).then(response => { 
        history.push('/scf/pops')
        return;
      }).catch((err) => {
        console.log(err);
        
        return;
      }); 
    } catch (err) {
      console.log(err);
      
      return;
    }
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <SideBar page='panel1' />
        <Body>
          <div>
            <h1>Novo POP</h1>

            <div className="form">
              <div className="small-width">
                <label>Título:</label>
                <input type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              
              <div className="small-width">
                <label>Número:</label>
                <input type="text" 
                  value={number} 
                  onChange={(e) => setNumber(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Versão:</label>
                <input type="text" 
                  value={version} 
                  onChange={(e) => setVersion(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Executante:</label>
                <input type="text" 
                  value={performer} 
                  onChange={(e) => setPerformer(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Área:</label>
                <input type="text" 
                  value={zone} 
                  onChange={(e) => setZone(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Objetivo:</label>
                <input type="text" 
                  value={objective} 
                  onChange={(e) => setObjective(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Preparado por:</label>
                <input type="text" 
                  value={madeBy} 
                  onChange={(e) => setMadeBy(e.target.value)} 
                />
              </div>

              <div className="small-width">
                <label>Revisado por:</label>
                <input type="text" 
                  value={reviewedBy} 
                  onChange={(e) => setReviewedBy(e.target.value)} 
                />
              </div>
            </div>
            
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorStyle={{ padding: '10px 20px' }}
              editorClassName="card-body"
              onEditorStateChange={newState => {
                setEditorState(newState);
                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
              }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
                inline: { inDropdown: true },
              }}
            />

            <div className="button">
              <button onClick={() => promiseAdd()}>
                Gravar
              </button>
            </div> 
          </div>

        </Body>
      </Container>
    </>
  );
}

export default POPSAdd;