import React, { Component } from 'react';
import logo from './logo.svg';
import beeGee from './img/bee_gee.jpeg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor,
  display: 'inline-block',
}



class Aggregate extends Component {
  render() {
    return(
      <div className="aggregate">
        <h2> Number </h2>
      </div>
    )
  }
}


class Input extends Component {
  render() {
    return(
      <div style={{width: "33%", display: 'inline-block'}}>
        <div style={{color: defaultTextColor}}>A</div>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
      <img/>
      <input type="text"/>
    </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return(
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 20px', width: '25%'}}>
        <img src={beeGee} style={{width: '150px', height: '150px'}}/>
        <h3>Playlist Name</h3>
        <ul style ={{listStyle: 'none'}}>
          <li>Song 1 </li>
          <li>Song 2 </li>
          <li>Song 3 </li>
        </ul>
      </div>
    )
  }
}


// Main component for setting 
class App extends Component {
  render() {
    let name = "Markus"
    let headerColor = 'red'

    return (
      <div className="App">
        <header className="App-header">
          <h1>Title</h1>
          <Aggregate></Aggregate>        
          <Input/>         
          <Input/> 
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </header>

      </div>

    );
  }
}

export default App;
