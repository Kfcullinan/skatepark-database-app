import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const AddSkateparkPage = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newSkatepark, setSkatePark] = useState({id: 5, name: ''});

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
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newSkatepark)}</pre>
            <form onSubmit={addNewSkatepark}>
                <input type='text' value={newSkatepark.name} onChange={handleNameChange} />
                <input type='submit' value='Add New Skatepark' />
            </form>
        </div>
    );
}




export default AddSkateparkPage; 