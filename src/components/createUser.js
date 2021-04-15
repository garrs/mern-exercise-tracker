import React, { Component, useState } from 'react';
import axios from 'axios';
// import {TextField, Button, Typography, Paper} from '@material-ui/core'

const CreateUser = () => {
  const [userName, setUserName] = useState({
    userName: ''
  });

const handleSubmit = (e) => {
  e.preventDefault(); 

  alert('Added username: ' + userName.userName)

  axios.post('http://localhost:5000/users/add', userName)
    .then(res => console.log(res.data));


  setUserName({ ...userName, userName: ''})
}

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input type="text"
              required
              className="form-control"
              value={userName.userName}
              onChange={(e) => setUserName({ ...userName, userName: e.target.value})}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
 
export default CreateUser;
