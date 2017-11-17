import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';


class App extends Component {
  state = {
    persons: [
      { id: '12346', name: 'Jonas Costa', age: 24 },
      { id: '34534', name: 'Manuel', age: 25 },
      { id: '34565', name: 'Stephanie', age: 25 }
    ],

    otherState: 'Some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }
  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });

  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });

  }


  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        </div>
      );

      btnClass = classes.Red;


    }

    //let classes = ['red', 'bold'].join(' '); //red bold
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (

      <div className={classes.App}>
        <h1>Ola Mundo React</h1>
        <h1>React is coll!</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!</p>

        <button
          className={btnClass}
          onClick={this.togglePersonHandler}>
          Toggle Person
        </button>

        {persons}

      </div>

    );
  }
}

export default App;
