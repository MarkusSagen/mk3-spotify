import React, { Component } from 'react';
import beeGee from './img/bee_gee.jpeg';
import queryString from 'query-string';
import './App.css';

// Import Material-UI for buttons
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Styles
let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor,
  display: 'inline-block',
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});





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
      <p style={{color: '#ddd', fontSize: 'calc(8px + 2vmin)'}}> Filter Playlists</p>
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
        <img alt="Album Cover" src={playlist.imageUrl} style={{width: '150px', height: '150px'}}/>
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
      <div className="PlaylistComponent" style={{...defaultStyle, padding: '40px 10px', width: '25%'}}>
        <h3 style={{marginBottom: '0px'}}> Playlists Listed </h3>
        <h3 style={{marginTop: '5px', color: 'lightBlue'}}> {this.props.playlists.length} </h3>
      </div>
    )
  }
}

class PlaylistHours extends Component {
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
        <h3 style={{marginBottom: '0px'}}> Total Hours </h3>
        <h3 style={{marginTop: '5px', color: 'lightBlue'}}> {totPlaylistDurration} </h3>
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
        filterString: ''
      }
    };

    componentDidMount() {
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token;
      if (!accessToken)
        return;
      fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
        }
      }))
  
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json())
      .then(data => this.setState({
        playlists: data.items.map(item => {
          console.log(data.items)
          return {
            name: item.name,
            imageUrl: item.images[0].url, 
            songs: []
          }
      })
    }))
  }

  render() {
    // Set to variable to shorten state call
    let playlistToRender = 
      this.state.user && 
      this.state.playlists
        ? this.state.playlists.filter(playlist => 
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())) 
        : [];

    return (
      <div className="App">
        <header className="App-header">
        {this.state.user 
          ? <div>
              <h1>Playlist for <span style={{'color': '#fc4a22'}}>
                {this.state.user.name}</span> 
              </h1>
              <PlaylistCounter playlists={playlistToRender}/>
              <PlaylistHours playlists={playlistToRender}/> 
              <Filter onTextChange={text => this.setState({filterString: text})}/>
              
              <div style={{width: '100%', height: '10vh'}}></div>
              
             {playlistToRender.map(playlist => 
                <PlaylistContainer playlists={playlist}/>
              )} 
            </div> 
          : 
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
            }}>
              <h2> Welcome to the test page for Spotifys API </h2>
              <h4> Please sign in <span style={{'color': 'lightBlue'}}>below</span> to try it </h4>
              <div style={{width: '100%', height: '50px'}}></div>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="Add"
                onClick={() => window.location = 'https://mk3-spotify-backend.herokuapp.com/login'} >
                // onClick={() => window.location = 'https://localhost:8888/login'} >
                Sign in to Spotify 
              </Fab>

              <div>
                <Card style={{'width': '400px', 'paddingTop': '25px', 'marginTop': '25px'}}>
                  <CardActionArea>
                    <CardMedia
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Login to your spotify Account
                      </Typography>
                      <Typography component="p">
                        Logs in and returns content from your account
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a style={{'textDecoration': 'none'}} href="https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/">
                        Learn More
                      </a>
                    </Button>
                  </CardActions>
                </Card>

                <Card style={{'width': '400px', 'paddingTop': '25px', 'marginTop': '25px'}}>
                  <CardActionArea>
                    <CardMedia
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Display current users Albums
                      </Typography>
                      <Typography component="p">
                        Gets all playlists from the current logged in user and displays a maximum of 20 playlists
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <a style={{'textDecoration': 'none'}} href="https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/">
                        Learn More
                      </a>
                    </Button>
                  </CardActions>
                </Card>
              </div>

            </div>
        }

        </header>
        <p className="reference" style={{'color': 'lightGray'}}> Made by Markus - 2019</p>
      </div>

    );
  }
}

export default App;
