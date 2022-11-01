import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';




function AddSkateparkPage() {
    const features = useSelector( store => store.features );
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [space_type, setSpace_type] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    //Initial state is an OBJECT, with keys id and name
    // let [newSkatepark, setSkatePark] = useState({id: 5, name: ''});
    useEffect(()=> {
        if (id) {
            axios.get (`/api/parks/${id}`)
            .then (response => {
                const skatepark = response.data;
                setName(skatepark.name);
                setLocation(skatepark.location);
                setSpace_type(skatepark.space_type);
                setDifficulty(skatepark.difficulty);
                setPhoto(skatepark.photo);
            })
        }

    },[id])
    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setSkatePark({...newSkatepark, name: event.target.value})
    }

    const cancelEditButton = () => {
        history.push('/details/id')
    }

    const addNewSkatepark = event => {
        event.preventDefault();
        dispatch({ 
            type: 'POST_SKATEPARK', 
            payload: newSkatepark.name
                     });
        //updates the next skatepark to have a new id
        //setSkatepark({id:newSkatepark.id + 1, name: ''});
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (id){
            dispatch({type: 'EDIT_SKATEPARK', payload: { name, location, space_type, difficulty, photo, id}, history});
        } else {
            dispatch({ type: 'ADD_SKATEPARK', payload: { name, location, space_type, difficulty, photo, feature_id: 1}, history}); 
        }
        // Pass history with our dispatch so that the saga can redirect
    }
    return (
        <div>
        <Card>
            <h3>{id ? 'Edit Skatepark': 'Add a park here'}</h3>
            
            <form onSubmit={submitForm}>
                <p>Name: <input value={name} onChange={(e) => setName(e.target.value)} type="text"/></p>                
                <p>Photo: <input value={photo} onChange={(e) => setPhoto(e.target.value)}  type="text"/></p>
                <p>Location: <input value={location} onChange={(e) => setLocation(e.target.value)}  type="text"/></p>
                <p>Space Type: <input value={space_type} onChange={(e) => setSpace_type(e.target.value)} type="text"/></p>
                <p>Difficulty: <input value={difficulty} onChange={(e) => setDifficulty(e.target.value)}  type="text"/></p>
                <input type="submit" />
                <button onClick={cancelEditButton}>Cancel</button>
            </form>
            </Card>
            </div>
    );
}




export default AddSkateparkPage; 