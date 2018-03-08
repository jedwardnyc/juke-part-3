import React from 'react';
import NewPlaylist from './NewPlaylist';
import axios from 'axios';

export default class PlaylistContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playlistInput: '',
      playlists: this.props.playlists
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(event){
    this.setState({
      playlistInput: event.target.value
    })
  }
  onSubmit(event){
    event.preventDefault()
    this.props.addPlaylist(this.state.playlistInput)
    this.setState({playlistInput: ''})
  }
 
  render(){
    return(
      <div>
        <NewPlaylist onChange={this.onChange} onSubmit={this.onSubmit} value={this.state.playlistInput}/>
      </div>
    )
  }
}