import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card'; 
import CardHeader from '@mui/material/Card'; 
import CardActions from '@mui/material/CardActions'; 
import CardMedia from '@mui/material/CardMedia'; 
import Typography from '@mui/material/Typography';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const skateparks = useSelector(store => store.skateparks);

  const navToAddParkPage = () => {
    history.push("/newpark")
  }
  console.log('hello', skateparks)
  useEffect(() => {
    dispatch({ type: "FETCH_SKATEPARKS" });
  }, []);

  const displaySkatepark = (skateparkToDisplay) => {
    // dispatch ({ type: 'SELECT_SKATEPARK', payload: skatepark});
    // dispatch ({ type: 'FETCH_FEATURES', payload: skateparks.id});
    history.push(`/detail/${skateparkToDisplay.id}`);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <br></br>
      <br></br>

      <button onClick={navToAddParkPage}>Add new skatepark</button> 

      
    
        <h1>Skateparks</h1>
        <section>
          {/* <Grid container spacing={4}></Grid> */}
          {skateparks.map(skateparks => {
            return (
              <div key={skateparks.id}>
                <h2>{skateparks.name}</h2>
                <img className="skateparkPhoto" src={skateparks.photo} />
                <h3>{skateparks.location}</h3>
                <h3>{skateparks.space_type}</h3>
                <h3>{skateparks.difficulty}</h3>
                
                 {/* <button onClick={() => {detail(skatepark)}}/>  */}
                <br></br>
                
              </div>
            );
          })}
        </section>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
