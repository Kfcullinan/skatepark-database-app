// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';


// function SkateparkDetailsPage (){
//     const skateparks = useSelector(store => store.individualSkateparkReducer);
//     const features = useSelector(store => store.features);
//     const { skateparkId } = useParams();
//     const dispatch = useDispatch();
//     const history = useHistory()

//     const returnHome = () => {
//         history.push('/')
//     }

//     useEffect(() => {
//         dispatch({ type: 'FETCH_SKATEPARK_DETAILS', payload: skateparkId });
//     }, [skateparkId])

//     return(
//         <div>
//             <h1>{skateparkId}</h1>
//             <h2>{skateparks.name}</h2>
//             <img style={{width:"15%"}} className="skateparkPhoto" src={skateparks.photo}/>
//             <h3>{skateparks.location}</h3>
//             <p>{skateparks.space_type}</p>
//             <p>{skateparks.difficulty}</p>
//             <br />
//             <h3>Features: </h3>
//                 <ul>
//                     {
//                     features.map(featuresToDisplay => <li>{featuresToDisplay.type}</li>)
//                     }
//                 </ul>
//             <br />
//             <br />
//             <button onClick={returnHome}>Return Home</button>

//         </div>
//     )
// }

// export default SkateparkDetailsPage; 