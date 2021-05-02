import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Figure } from 'react-bootstrap';

// split this component later on in its own file
// make a button for the edit and delete 'buttons'
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
        {/* deleteExercise function used by props came from line 38 */}
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

const ExerciseTest = () => (
  <tr>
    <td>dog</td>
    <td>cat</td>
    <td>2</td>
    <td>10/10/10</td>
  </tr>
)

const ExercisesList = () => {
  const [exercises, setExercises] = useState({
    exercises: []
})


// export default class ExercisesList extends Component {
//   constructor(props) {
//     super(props);

//     this.deleteExercise = this.deleteExercise.bind(this)

//     this.state = {exercises: []};
//   }

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        
        setExercises({...exercises, exercises: response.data})
        alert('exercises ' + JSON.stringify(response.data))
        // this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      
  }, []) 

  // componentDidMount() {
  //   axios.get('http://localhost:5000/exercises/')
  //     .then(response => {
  //       this.setState({ exercises: response.data })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  const deleteExercise = (id) => 
  {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

      // setExercises({...exercises, exercises: response.data})
      setExercises({...exercises, exercises: exercises.filter(el => el._id !== id)})
    // this.setState({
    //   exercises: this.state.exercises.filter(el => el._id !== id)
    // })
  }

  const exerciseList = () => 
  {
    // debugger
    return (
    exercises.exercises.map((currentexercise) => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
    })
    )
    // return <ExerciseTest/>;
  }

  // debugger
  
  return (
      // let exerciseListChecker = exerciseList === [] ? "t" : "f"
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* let exerciseListChecker = exerciseList === [] ? alert("NOI!") : exerciseList } */}
            {/* {!exerciseList && 
              <Figure className="text-center">
                <Figure.Caption>
                  TODO: placeholder content
                </Figure.Caption>
                <Figure.Image width={500}
                  height={500}
                />
              </Figure>
            } */}
            {exerciseList()}
            {/* <tr>
              <td>dog</td>
              <td>cat</td>
              <td>2</td>
              <td>10/10/10</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    )
}

export default ExercisesList;