import React, { Component } from 'react';
//import logo from './logo.svg';
import beeGee from './img/bee_gee.jpeg';
import './App.css';

// Styles
let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor,
  display: 'inline-block',
}


// Fake data
let fakeServerData = {
  user: {
    name: "Markus", 
    playlists: [
      {
        name: "Favorites",
        songs: [
          {name: "Rosa", duration: 1234},  
          {name: "bss", duration: 1234},  
          {name: "GEEEr", duration: 1234}
        ],

      },
      {
        name: "gg",
        songs: [ 
          {name: "bear", duration: 666},
          {name: "Yellow", duration: 1234},
        ],
      },
      {
        name: "bege",
        songs: [
          {name: "bear", duration: 1234},
          {name: "bear", duration: 7722},
          {name: "bear", duration: 1234},
          {name: "bear", duration: 420}
        ],
      },
      {
        name: "aaa",
        songs: [
          {name: "bear", duration: 1234},
          {name: "bear", duration: 1234},
          {name: "bear", duration: 999999}
        ],

      },
    ]
  }
}



/* COMPONENTS */



class Filter extends Component {
  render() {
    return(
      <div>
      
      <input type="text"/>
    </div>
    )
  }
}


class PlaylistContainer extends Component {
  render() {
    return(
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 20px', width: '25%'}}>
        <img alt="Album Cover" src={beeGee} style={{width: '150px', height: '150px'}}/>
        <h3> {this.props.playlists && this.props.playlists.length} </h3>
        <ul style ={{listStyle: 'none'}}>
          <li>Song 1 </li>
          <li>Song 2 </li>
          <li>Song 3 </li>
        </ul>
      </div>
    )
  }
}

class PlaylistCounter extends Component {
  // Since playlist is garanteed to exist when rendered, we remove check here
  render() {
    return(
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 20px', width: '25%'}}>
        <h3> {this.props.playlists.length} Playlists </h3>
      </div>
    )
  }
}

class PlaylistHours extends Component {
  // Since playlist is garanteed to exist when rendered, we remove check here

  
  render() {
    // call this with allSongs.length
    let allSongs = this.props.playlists.reduce((songs, fEachPlaylist) => {
     return songs.concat(fEachPlaylist.songs) 
    },[])
    // call this with totPlaylistDurration.length
    let totPlaylistDurration = allSongs.reduce((sum, eachSongs) => {
      let totMilliSec = sum + eachSongs.duration
      return Math.round( totMilliSec / 60 ) 
     },0)
    return(
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 20px', width: '25%'}}>
        <h3> {totPlaylistDurration} Hours </h3>
      </div>
    )
  }
}






// Main component for setting 
class App extends Component {
  // Initialize state in a constructor
  constructor() {
    super();
    this.state = {serverData: {}}
  }

  // Await everything to load and set dependent states
  componentDidMount(){
    // Wait 1 secound and then displays data
    setTimeout( () => {
      this.setState({serverData: fakeServerData});
    },1000);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Playlist for</h1>
        {this.state.serverData.user 
          ?
          <div>
            <h2> 
              {this.state.serverData.user.name}
            </h2>
            
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <PlaylistHours playlists={this.state.serverData.user.playlists}/>
            
            <div style={{width: '100%', height: '20px'}}></div>
            
            <PlaylistContainer/>
            <PlaylistContainer/>
            <PlaylistContainer/>
            <PlaylistContainer/>
            <PlaylistContainer/>
            <PlaylistContainer/>
          </div> 
          
          : 
          <div style={defaultStyle}>
            loading...
          </div>
        }
          <Filter/>
          
          
        </header>

      </div>

    );
  }
}

export default App;
