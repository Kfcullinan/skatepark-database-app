import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SkateparkDetailsPage (){
    const skateparks = useSelector(store => store.selectSkatepark);
    // const features = useSelector(store => store.features);
    const history = useHistory()

    const returnHome = () => {
        history.push('/')
    }

    return(
        <div>
            <h2>{skateparks.name}</h2>
            <h3>{skateparks.location}</h3>
            <p>{skateparks.space_type}</p>
            <p>{skateparks.difficulty}</p>
            <br />
            <h3>Features: </h3>
             {features.map(features => `${features.type}`)} 
            <br />
            <br />
            <button onClick={returnHome}>Return Home</button>

        </div>
    )
}

export default SkateparkDetailsPage; 