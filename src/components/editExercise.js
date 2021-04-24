import React, {useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const EditExercise = (props) => {
  const [userName, setUserName] = useState({
    userName: ''
  });
  const [description, setDescription] = useState({
    description: ''
  });
  const [duration, setDuration] = useState({
    duration: 0
  });
  const [date, setDate] = useState({
    date: ''
  });
  const [users, setUsers] = useState({
    users: []
  });

// export default class EditExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }


useEffect(() => {
  axios.get('http://localhost:5000/exercises/'+ props.match.params.id)
      .then(response => {
        setUserName({...userName, userName: response.data.username})
        setDescription({...description, description: response.data.description})
        setDuration({...duration, duration: response.data.duration})
        setDate({...date, date: new Date(response.data.date)})
        // this.setState({
        //   username: response.data.username,
        //   description: response.data.description,
        //   duration: response.data.duration,
        //   date: new Date(parseInt(response.data.date))
        // })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        // this.setState({
        //   users: response.data.map(user => user.username),
        //   username: response.data[0].username
        // })
        setUsers({...users, users: response.data.map(user => user.username)})
        // setUserName({...userName, userName: response.data[0].username})
      }
     })
      .catch((error) => {
        console.log(error);
      })
      // alert('users and userName ' + JSON.stringify(users) + JSON.stringify(userName))
}, []) 

  // componentDidMount() {
  //   // this.props.match.params.id is the url upon clicking edit from one of the users
  //   // this whole axios function initializes the default value of the form
  //   axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
  //     .then(response => {
  //       this.setState({
  //         username: response.data.username,
  //         description: response.data.description,
  //         duration: response.data.duration,
  //         date: new Date(parseInt(response.data.date))
  //       })   
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })

  //   axios.get('http://localhost:5000/users/')
  //     .then(response => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           users: response.data.map(user => user.username),
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })

  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: userName.userName,
      description: description.description,
      duration: duration.duration,
      date: date.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const exercise = {
  //     username: this.state.username,
  //     description: this.state.description,
  //     duration: this.state.duration,
  //     date: this.state.date
  //   }

  //   console.log(exercise);

  //   axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
  //     .then(res => console.log(res.data));

  //   window.location = '/';
  // }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={userName.userName}
              onChange={(e) => setUserName({ ...userName, userName: e.target.value})}>
              {
                users.users.map((user) => {
                  return(
                  <option 
                    key={user}
                    value={user}>
                  {user}
                  </option>
                  )
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={description.description}
              onChange={(e) => setDescription({ ...description, description: e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration.duration}
              onChange={(e) => setDuration({ ...duration, duration: e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
          <DatePicker
            //  check how this will done as the setter for onChangeDate is different from the others
              selected={date.date}
              onChange={(date) => setDate({ ...date, date: date})}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }

export default EditExercise;