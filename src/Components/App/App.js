import './App.css';
import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults:[
    ],
                  playlistName: 'My Favorite songs',
                  playlistTracks: [],
                  term:""
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.some(t=> t.id===track.id)) {
      return;
    }
    
    this.setState({playlistTracks: [...this.state.playlistTracks, track]});
  }
  removeTrack(track) {
    const newList = this.state.playlistTracks.filter(t=> t.id!==track.id);    
    this.setState({playlistTracks: newList});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track=>track.uri);
    const isSuccess =Spotify.savePlaylist(this.state.playlistName,trackURIs);
    if(isSuccess!==false) this.setState({playlistName:'New Playlist', playlistTracks:[]});
  }
  async search(txt) {
    const Results = await Spotify.search(txt);
    this.setState({searchResults: Results});
  }

  handleTermChange(txt) {
    this.setState({term:txt});
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onNameChange={this.handleTermChange} onSearch={this.search} term={this.state.term} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults = {this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
