import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';



function AddSkateparkPage() {
    const features = useSelector( store => store.features );
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [spaceType, setSpaceType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    //Initial state is an OBJECT, with keys id and name
    // let [newSkatepark, setSkatePark] = useState({id: 5, name: ''});

    const handleNameChange = (event) => {
        console.log('event happened');
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setSkatePark({...newSkatepark, name: event.target.value})
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
        // Pass history with our dispatch so that the saga can redirect
        dispatch({ type: 'ADD_SKATEPARK', payload: { name, location, spaceType, difficulty, photo, feature_id: 1}, history});
    }
    return (
        <div>
            <h3>Add a park here</h3>
            <pre>{JSON.stringify(submitForm)}</pre>
            <form onSubmit={submitForm}>
                <p>Name: <input value={name} onChange={(e) => setName(e.target.value)} type="text"/></p>                
                <p>Photo: <input value={photo} onChange={(e) => setPhoto(e.target.value)}  type="text"/></p>
                <p>Location: <input value={location} onChange={(e) => setLocation(e.target.value)}  type="text"/></p>
                <p>Space Type: <input value={spaceType} onChange={(e) => setSpaceType(e.target.value)} type="text"/></p>
                <p>Difficulty: <input value={difficulty} onChange={(e) => setDifficulty(e.target.value)}  type="text"/></p>
                <input type="submit" />
            </form>
        </div>
    );
}




export default AddSkateparkPage; 