import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);

    this.state = {
      persons: [
        { id: '12346', name: 'Jonas Costa', age: 24 },
        { id: '34534', name: 'Manuel', age: 25 },
        { id: '34565', name: 'Stephanie', age: 25 }
      ],

      otherState: 'Some other value',
      showPersons: false
    }
  };

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //   nextState.showPersons !== this.state.showPersons;
  //   //return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }

  // state = {
  //   persons: [
  //     { id: '12346', name: 'Jonas Costa', age: 24 },
  //     { id: '34534', name: 'Manuel', age: 25 },
  //     { id: '34565', name: 'Stephanie', age: 25 }
  //   ],

  //   otherState: 'Some other value',
  //   showPersons: false
  // }

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

    console.log('[App.js] Inside a render()');

    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler} />
    }

    return (
      <div className={classes.App}>
        <button onClick={() => { this.setState({ showPersons: true }) }}>show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler} />

        {persons}
      </div>

    );
  }
}

export default App;
