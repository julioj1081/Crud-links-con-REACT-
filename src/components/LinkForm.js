import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
//importamos el firebase
import {db} from '../firebase'

const LinkForm = (props) =>{
    //recibimos de links
    const initialStateValues = {
        url: '',
        name : '',
        description: ''
    }
    //objeto de react
    const [values, setvalues] = useState(initialStateValues);

    const handleInputChange = e => {
        //obtiene el name y valor de cada input con su respectivo valor
        const {name, value} = e.target;
        //console.log(name, value);
        setvalues({...values, [name]: value});
       
    };

    //validacion de url
    const validURL = (str) => {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
      };

    //capturamos el submit del formulario
    const handleSubmit = e => {
        e.preventDefault();
        //validacion de url si no es valido
        if (!validURL(values.url)) {
            return toast("invalid url", { type: "warning", autoClose: 1000 });
        }

        //console.log(values);
         //guardamos 
         props.addOrEditLink(values);
         //limpiar los datos solo tenemos que añadir el value en cada input
         setvalues({...initialStateValues});
    }
    //obtener un enlace por id
    const getLinkById = async (id) => {
        const doc = await  db.collection('links').doc(id).get();
        //console.log(doc.data());
        setvalues({...doc.data()});
    }

    //le pasamos el props.currentId
    useEffect(() => {
        console.log(props.currentId)
        if(props.currentId === ''){
            setvalues({...initialStateValues});
        }else{
            //si si tiene un id seleccionado
            //console.log(porps.currentId);
            getLinkById(props.currentId);
        }
    }, [props.currentId])


    return <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
            <div className="input-group-text bg-light">
                <i className="material-icons">insert_link</i>
            </div>
            <input type="text" className="form-control" placeholder="https://someurl.com" name="url" onChange={handleInputChange} value={values.url}/>
        </div>
        <div className="form-group input-group">
            <div className="input-group-text bg-light">
                 <i className="material-icons">add</i>
            </div>
            <input type="text" className="form-control" name="name" placeholder="website name" onChange={handleInputChange} value={values.name}/>
        </div>

        <div className="form-group">
            <textarea name="description" rows="3" className="form-control" placeholder="write a description" onChange={handleInputChange} value={values.description}></textarea>
        </div>

        <button className="btn btn-primary btn-block">
            {props.currentId === '' ? 'Save' : 'Update'}
        </button>
    </form>
}

export default LinkForm;