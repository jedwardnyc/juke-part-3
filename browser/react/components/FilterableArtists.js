import React from 'react';
import FilterInput from './FilterInput';
import AllArtists from './AllArtists';
import axios from 'axios';


export default class FilterableArtists extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formInput: '',
      artists: this.props.artists
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(event){
    this.setState({
      formInput: event.target.value
    })
  }
  
  render(){
    const input = this.state.formInput;
    const filteredArtist = this.state.artists.filter(artist => 
      artist.name.toLowerCase().match(input.toLowerCase()));
    return (
      <div>
        <FilterInput onChange={this.onChange}/> 
        <AllArtists artists={filteredArtist}/>
      </div>
    )
  }
}
