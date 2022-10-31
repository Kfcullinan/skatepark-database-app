import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';


function SkateparkDetailsPage() {
    const skatepark = useSelector(store => store.individualSkateparkReducer);
    const features = useSelector(store => store.features);
    const { skateparkId } = useParams();
    //const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const returnHome = () => {
        history.push('/')
    }

    const editSkatepark = () => {
        history.push(`/edit/${skateparkId}`)
    };

    const deleteSkatepark = () => {
        useEffect(() => {
        dispatch({ type: 'DELETE_SKATEPARK', payload: skateparkId })
        }, [skateparkId]);
        history.push('/')
        window.scrollTo(0,0);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_SKATEPARK_DETAILS', payload: skateparkId });
    }, [skateparkId])



    return(
        <div>
            <h1>{skateparkId}</h1>
            <h2>{skatepark.name}</h2>
            <img src={skatepark.photo} alt={skatepark.name}/>
            <h3>{skatepark.location}</h3>
            <p>{skatepark.space_type}</p>
            <p>{skatepark.difficulty}</p>
            <br />
            <h3>Features: </h3>
                 {/* <ul>
                    {
                    features.map(featuresToDisplay => <li>{featuresToDisplay.type}</li>)
                    }
                </ul>  */}
            <br />
            <br />
            <button onClick={returnHome}>Return Home</button>
            <button><Link to={`/edit/${skatepark.id}`}>Edit Skatepark</Link></button>
            <button onClick={deleteSkatepark}>Delete Skatepark</button>
        </div>
    )
}

export default SkateparkDetailsPage; 