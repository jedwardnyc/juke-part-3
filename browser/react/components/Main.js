import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import FilterableArtists from './FilterableArtists';
import NewPlaylist from './NewPlaylist';
import PlaylistContainer from './PlaylistContainer';
import axios from 'axios';
import Playlist from './Playlist';


export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      artists: [],
      albums: [],
      playlists: [],
      selectedPlaylist: {}
    }
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }
  componentDidMount(){
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => this.setState({ albums }));
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
    axios.get('/api/playlists/')
      .then(res => res.data)
      .then(playlists => this.setState({ playlists }));
  }

  addPlaylist(playlistName){
    axios.post('/api/playlists', {name: playlistName})
      .then( res => res.data)
      .then( playlist => this.setState({playlists: [...this.state.playlists, playlist]}))
  }

  selectPlaylist(playlistId){
    axios.get(`/api/playlists/${playlistId}`)
      .then( res => res.data)
      .then ( playlist => this.setState({ selectedPlaylist: playlist }))
  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists}/>
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" render={()=> <FilterableArtists artists={this.state.artists}/> } />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route exact path="/newplaylist" render={()=> <PlaylistContainer addPlaylist={this.addPlaylist} playlists={this.state.playlists}/>} />
              <Route path="/playlists/:playlistId" render={()=> <Playlist selectPlaylist={this.selectPlaylist} playlist={this.state.selectedPlaylist}/> } />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
