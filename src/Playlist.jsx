// Playlist.js
import React from 'react';
import './Playlist.css';
import Tracklist from './Tracklist';
import PropTypes from 'prop-types';

class Playlist extends React.Component {
  static propTypes = {
    playlistName: PropTypes.string.isRequired,
    isEditingPlaylistName: PropTypes.bool.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onNameChange: PropTypes.func.isRequired,
  };

  handleSavePlaylist = () => {
    const trackURIs = this.props.getURIsFromPlaylist(); // Call this method from props
    // Call the method to interact with the Spotify API using track URIs
    // Reset the playlist in the app's state
    this.props.resetPlaylist();
  };

  render() {
    const {
      playlistName,
      isEditingPlaylistName,
      playlistTracks,
      onNameChange,
    } = this.props;

    return (
      <div className="Playlist">
        {isEditingPlaylistName ? (
          <input
            value={playlistName}
            onChange={handlePlaylistNameChange}
            onChange={onNameChange}
            onBlur={this.toggleEditingPlaylistName}
            autoFocus
          />
        ) : (
          <h2 onClick={this.toggleEditingPlaylistName}>{playlistName}</h2>
        )}

        <h2>My Playlist</h2>
        <Tracklist tracks={playlistTracks} />
        <button className="Playlist-save" onClick={this.handleSavePlaylist}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
