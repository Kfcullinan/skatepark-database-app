import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const dispatch = useDispatch();
    const skateparks = useSelector(store => store.skateparks);
 
    useEffect(() => {
      dispatch({ type: 'FETCH_SKATEPARKS' });
  }, []);
  
  return (
    <div className="container">
      <h2>{heading}</h2>
      {
       skateparks.map(skateparks => {
          return <div key={skateparks.id}>{skateparks.name}</div>
      })
      }
     </div>
  );
}

export default LandingPage;
