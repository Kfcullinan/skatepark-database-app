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
    history.push(`/details/${skateparkToDisplay.id}`);
  }

  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      {/* <p>Your ID is: {user.id}</p> */}
      
      <br></br>
      <br></br>

      <button onClick={navToAddParkPage}>Add new skatepark</button> 

      
      <main>
        <h1>Skateparks</h1>
        <section>
          <Grid item xs={12} md={6} xl={4}> 
            <Card elevation={3}>
          {skateparks.map(skateparks => {
            return (
              <div key={skateparks.id}>
                <h2>{skateparks.name}</h2>
                <img onClick={(event) => displaySkatepark(skateparks)} src={skateparks.photo} alt={skateparks.name} />
                {/* <h3>{skateparks.location}</h3>
                <h3>{skateparks.space_type}</h3>
                <h3>{skateparks.difficulty}</h3> */}
                
                      <br></br>
              </div>
            );
          })}
          </Card>
          </Grid>
        </section>
      </main>
    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
