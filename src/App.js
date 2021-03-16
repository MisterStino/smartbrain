import React, { Component } from 'react';
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';

//Configuration

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
    input: '',
    imageURL: '',
    age: {},
    masculine: {},
    feminine: {},
    multiculturalAppearance: [],
    showTable: false,
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

//Main App render section
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  retrieveEstimates = (data) => {
    const concepts = data.outputs[0].data.regions[0].data.concepts
    //Age part
    const ageConcepts = concepts.map((concept) => {
      if (concept.vocab_id === "age_appearance") {
          return concept
        }
      })
    const highestAge = (({ name, value }) => ({ name, value }))(ageConcepts[0]);
    //gender part
    //male
    const masculineArray =concepts.filter((e) => {
      return e.name === 'masculine';
    });
    const masculine = masculineArray[0];
    //female
    const feminineArray =concepts.filter((e) => {
      return e.name === "feminine";
    });
    //Multiculti apprearance
    const multiculturalAppearance =concepts.filter((e) => {
      return e.vocab_id === "multicultural_appearance";
    });
    const feminine = feminineArray[0];
    //setting State
    this.setState({masculine: masculine})
    this.setState({feminine: feminine})
    this.setState({age: highestAge})
    this.setState({multiculturalAppearance: multiculturalAppearance})
  }

  onInputChange = (event) => {
    this.setState({imageURL: event.target.value})
  }

  onRouteChange = (route) => {
    if( route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  onSubmit = () => {
    fetch('https://safe-brushlands-44505.herokuapp.com/imageClarifai', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          inputURL: this.state.imageURL
        })
      }).then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://safe-brushlands-44505.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
        }).then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
        })
        }
        console.log(response)
        this.retrieveEstimates(response)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({showTable: true})
      });
  }
  loadUser = (data) => {
    const { id, name, email, entries, joined} = data;
    this.setState({user: {
      id: id,
      name: name,
      email: email,
      entries: entries,
      joined:joined
    }})
  }

  render() {
    const { isSignedIn, imageURL, masculine, feminine, age, multiculturalAppearance, showTable, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} 
        />
        <Navigation 
        onRouteChange={this.onRouteChange}
        isSignedIn={isSignedIn}
        />
        { this.state.route === 'home'
        ? <div>
            <Logo/>
            <Rank 
            name={user.name}
            entries={user.entries}
            />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onSubmit={this.onSubmit}
            /> 
            <FaceRecognition 
            imageURL={imageURL}
            masculine={masculine}
            feminine={feminine}
            age={age}
            multiculturalAppearance={multiculturalAppearance}
            showTable={showTable}
            />
          </div>
          :(
            this.state.route === 'signin'?
            <SignIn 
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            />
            :<Register 
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
            />
          )  
        }
      </div>
    );
  }
}
export default App;
