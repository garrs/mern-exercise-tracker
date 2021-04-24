import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// convert this to stateful functional component

const CreateExercise = () => {
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
    date: new Date()
  });
  const [users, setUsers] = useState({
    users: []
  });
  // const inputRef = useRef()

// export default class CreateExercise extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangeDuration = this.onChangeDuration.bind(this);
//     this.onChangeDate = this.onChangeDate.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     // do useState here
//     this.state = {
//       username: '',
//       description: '',
//       duration: 0,
//       date: new Date(),
//       users: []
//     }
//   }

// use useEffect instead of componentDidMount

useEffect(() => {
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

const handleSubmit = (e) => {
    e.preventDefault();

    // learn how to get the states from useStates here
    const exercise = {
      username: userName.userName,
      description: description.description,
      duration: duration.duration,
      date: date.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
              // ref={inputRef}
              required
              className="form-control"
              value={userName.userName}
              // check how to do this after doing the react hooks
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
          {/* <input  type="text"
              required
              className="form-control"
              value={description.description}
              onChange={(e) => setDescription({ ...description, description: e.target.value})}
              /> */}
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
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}

export default CreateExercise;