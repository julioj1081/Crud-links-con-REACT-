import React, {useEffect, useState} from 'react'
//importamos el linkForm
import LinkForm from './LinkForm'

//importamos el firebase
import {db} from '../firebase'

//añadimos la libreria de mensajes tostify
import {toast} from 'react-toastify'

const Links = () =>{

    const [links, setLinks] = useState([])

    //esto es para modificar obtine el id actual
    const [currentId, setCurrentId] = useState("");

    const addOrEditLink = async (linkObjet) =>{
        //console.log(linkObjet);
        try{
            if(currentId === ''){
                await db.collection('links').doc().set(linkObjet);
                toast('New link', {
                    type: 'success'
                });
            }else{
                await db.collection('links').doc(currentId).update(linkObjet);
                toast('Updated link', {
                    type: 'info'
                });
                setCurrentId('');
            }
        }catch(Error){
            console.error(Error);
        }
    }
    //get links
    const getLinks = async () => {
      await db.collection('links').onSnapshot((querySnapshot) => {
          //agrupamos el contenido con el id
          const docs = [];
        querySnapshot.forEach(doc => {
            //console.log(doc.data()); nos trae todo
            docs.push({...doc.data(), id:doc.id});
            //console.log(docs);
        })
        setLinks(docs);
      });
    }
    //consulta
    useEffect(() => {
        //console.log('obteniendo datos');
        getLinks();
    }, [])

    //delete
    const onDeleteLink = async (id) => {
        if(window.confirm('estas seguro de eliminar este link')){
            //console.log(id);
            await db.collection('links').doc(id).delete();
            toast('Link removed successfully', {
                type: 'error',
                autoClose: 1000
            });
        }
    } 

    return <div className="row">
        <div className="col-md-4 mt-5">
            <LinkForm {...{addOrEditLink, currentId, links}}/>
        </div>
        
        <div className="col-md-8">
        <h1>Links disponibles</h1>
            {links.map(link => {
                return <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div className="d-flex justify-content-between">
                                <i className="material-icons text-info mr-4" onClick={() => onDeleteLink(link.id)} >Delete</i>
                                <i className="material-icons text-info" onClick={() => setCurrentId(link.id)} >Update</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                        
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default Links;