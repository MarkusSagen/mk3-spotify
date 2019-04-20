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
        name: "My Weekly",
        songs: [ 
          {name: "bear", duration: 666},
          {name: "Grills", duration: 1337},
          {name: "Yellow", duration: 1234},
        ],
      },
      {
        name: "Discover weekly",
        songs: [
          {name: "bear", duration: 1234},
          {name: "bears", duration: 7722},
          {name: "all", duration: 1234},
          {name: "bear", duration: 420}
        ],
      },
      {
        name: "Disco",
        songs: [
          {name: "file", duration: 1234},
          {name: "to", duration: 1234},
          {name: "file", duration: 97999}
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
      
      <input type="text" onKeyUp={e => 
        this.props.onTextChange(e.target.value)}/>
    </div>
    )
  }
}


class PlaylistContainer extends Component {
  render() {
    let playlist = this.props.playlists;
    return(
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 20px', width: '25%'}}>
        <img alt="Album Cover" src={beeGee} style={{width: '150px', height: '150px'}}/>
        <h3> {playlist.name} </h3>
        <ul style ={{listStyle: 'none'}}>
          {playlist.songs.map(song => {
            return <li> {song.name} </li>
          })}
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
    this.state = {
      serverData: {},
      showNrSongs: 3,
      filterString: '',  
    }
  }

  // Await everything to load and set dependent states
  componentDidMount(){
    // Wait 1 secound and then displays data
    setTimeout( () => {
      this.setState({serverData: fakeServerData});
    },1000);
    setTimeout(() => {
      this.setState({filterString: ''})
    }, 2000);
  }

  render() {
    // Set to variable to shorten state call
    let renderUser = this.state.serverData.user;
    let playlistToRender = renderUser ? renderUser.playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
    ) : [];

    return (
      <div className="App">
        <header className="App-header">
        <h1>Playlist for</h1>
        {renderUser 
          ?
          <div>
            <h2> 
              {renderUser.name}
            </h2>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            <PlaylistCounter playlists={playlistToRender}/>
            <PlaylistHours playlists={playlistToRender}/>
            
            <div style={{width: '100%', height: '20px'}}></div>
            
            {playlistToRender.map(playlists => {
                return  <PlaylistContainer playlists={playlists}/>
            })}
            

            
          </div> 
          
          : 
          <div style={defaultStyle}>
            loading...
          </div>
        }
        </header>

      </div>

    );
  }
}

export default App;
