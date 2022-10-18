import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar';
import { Body, Container } from './styles';

import { AxiosError } from 'axios';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

interface Request {
  id: string;
}

const POPSEdit: React.FC = () => {
  const { id } = useParams<Request>();
  const history = useHistory();
  const { signOut } = useAuth(); 
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

  let promiseLoading = () => {
    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.post('/pops/detail', {id}).then(response => {
          // if(response.data[0] === undefined) { return history.push('/scf/pops') }
          setTitle(response.data.data.title);
          setNumber(response.data.data.number);
          setVersion(response.data.data.version);
          setPerformer(response.data.data.performer);
          setZone(response.data.data.zone);
          setObjective(response.data.data.objective);
          setMadeBy(response.data.data.madeby);
          setReviewedBy(response.data.data.reviewedby);

          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(response.data.data.content);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);
          setContent(response.data.data.content);

          setTimeout(resolve);
          return;
        }).catch((err: AxiosError) => {
          if(err.response?.status === 401) {
            signOut();
            return;
          }
  
          setTimeout(reject);
          return;
        }); 
      } catch (err) {
        setTimeout(reject);
        return;
      }
    });
  }

  useEffect(() => {
    promiseLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let promiseUpdate = () => {
    if(!title || title === '') {
      return toast.warning('Nenhum Título Definido');
    }

    const reseolveApi = new Promise((resolve, reject) => {
      try {
        api.put('/pops', { id, title, number, version, performer, zone, objective, madeBy, reviewedBy, content }).then(response => { 
          setTimeout(resolve);
          return;
        }).catch((err) => {
          console.log(err);
          setTimeout(reject);
          return;
        }); 
      } catch (err) {
        console.log(err);
        setTimeout(reject);
        return;
      }
    });

    toast.promise(
      reseolveApi,
      {
        pending: 'Consultando API',
        success: 'Sucesso ao Editar 👌',
        error: 'Erro ao Editar 🤯'
      }
    )
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <SideBar page='panel1' />
        <Body>
          <div>
            <h1>Editar POP</h1>

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
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'image'],
  
                inline: { inDropdown: true },
              }}
              
            />

            <div className="button">
              <button onClick={() => promiseUpdate()}>
                Editar
              </button>
            </div> 
          </div>

        </Body>
      </Container>
    </>
  );
}

export default POPSEdit;