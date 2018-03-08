import React from 'react';
import Songs from './Songs';

export default class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playlist: {}
    }
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    const mainPath = `/api/playlist/${playlistId}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    Bluebird
      .map(paths, path => axios.get(path))
      .map(res => res.data)
      .spread((playlist, albums, songs) => {
        playlist.albums = albums;
        playlist.songs = songs;
        this.setState({ playlist });
      });
  }

  render(){
    const playlist = this.props.playlist
    return(
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} />
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
      </div>
    )
  } 
}
