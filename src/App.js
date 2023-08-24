// App.js
import React from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './Spotify';

class App extends React.Component {
  state = {
    isEditingPlaylistName: false,
    searchResults: [
      {
        id: '1',
        name: 'Track 1',
        artist: 'Artist 1',
        album: 'Album 1',
      },
      {
        id: '2',
        name: 'Track 2',
        artist: 'Artist 2',
        album: 'Album 2',
      },
      {
        id: '3',
        name: 'Track 3',
        artist: 'Artist 3',
        album: 'Album 3',
      },
      {
        id: '4',
        name: 'Track 4',
        artist: 'Artist 4',
        album: 'Album 4',
      },
      {
        id: '5',
        name: 'Track 5',
        artist: 'Artist 5',
        album: 'Album 5',
      },
      // Add more tracks as needed
    ],
    playlistName: 'My Awesome Playlist',
    playlistTracks: [], // Initialize with an empty array
    isEditingPlaylistName: false,
  };

  addTrackToPlaylist = (track) => {
    if (
      !this.state.playlistTracks.find(
        (savedTrack) => savedTrack.id === track.id
      )
    ) {
      const newPlaylistTracks = [...this.state.playlistTracks, track];
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  };

  removeTrackFromPlaylist = (track) => {
    const newPlaylistTracks = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({ playlistTracks: newPlaylistTracks });
  };

  toggleEditingPlaylistName = () => {
    this.setState((prevState) => ({
      isEditingPlaylistName: !prevState.isEditingPlaylistName,
    }));
  };

  handlePlaylistNameChange = (event) => {
    this.setState({ playlistName: event.target.value });
  };

  getURIsFromPlaylist = () => {
    return this.state.playlistTracks.map((track) => track.uri);
  };

  resetPlaylist = () => {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    });
  };

  search = (term) => {
    const accessToken = Spotify.getAccessToken();

    // Use the access token for API requests
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tracks) {
          const tracks = data.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
          this.setState({ searchResults: tracks });
        }
      });
  };

  render() {
    return (
      <div className="App">
        <h1>My Jamming App</h1>
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrackToPlaylist}
            onRemove={this.removeTrackFromPlaylist}
          />
          <Playlist
            playlistName={this.state.playlistName}
            isEditingPlaylistName={this.state.isEditingPlaylistName}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.handlePlaylistNameChange}
            getURIsFromPlaylist={this.getURIsFromPlaylist}
            resetPlaylist={this.resetPlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
