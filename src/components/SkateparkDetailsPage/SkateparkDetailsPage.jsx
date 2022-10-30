import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SkateparkDetails() {
    const skatepark = useSelector(store => store.selectedSkatepark);
    const features = useSelector(store => store.features);
    const { skateparkId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_SKATEPARK_DETAILS", payload: skateparkId });
    }, [skateparkId]);

    return (
        <div>
            <h1>{skateparkId}</h1>
            <h3>{skateparks.name}</h3>
            <img src={skateparks.photo} />
            <p>{skateparks.location}</p>
            <p>{skateparks.space_type}</p>
            <p>{skateparks.difficulty}</p>
            <ul>
                {
                    features.map(featureToDisplay => <li>{featureToDisplay.type}</li>)
                }
            </ul>
        </div>
    )
}




export default SkateparkDetails;