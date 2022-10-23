import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const skateparks = useSelector((store) => store.skateparks);

  useEffect(() => {
    dispatch({ type: "FETCH_SKATEPARKS" });
  }, []);

  const detail = (skatepark) =>{
    dispatch ({ type: 'SELECT_SKATEPARK', payload: skatepark});
    dispatch ({ type: 'FETCH_FEATURES', payload: skateparks.id});
    history.push('/details')
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    
        <h1>Skateparks</h1>
        <section>
          <pre>{JSON.stringify(skateparks)}</pre>
          {skateparks.map(skateparks => {
            return (
              <div key={skateparks.id}>
                <h2>{skateparks.name}</h2>
                <h3>{skateparks.location}</h3>
                <h3>{skateparks.space_type}</h3>
                <h3>{skateparks.difficulty}</h3>
                <button onClick={() => {detail(skatepark)}}/>
                <br></br>
                {/* <button>DELETE</button> finish this */}
              </div>
            );
          })}
        </section>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
