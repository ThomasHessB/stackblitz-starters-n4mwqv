// Tracklist.js
import React from 'react';
import './Tracklist.css';
import Track from './Track';

class Tracklist extends React.Component {
  render() {
    const { searchResults } = this.props;
    const { tracks } = this.props;

    if (!searchResults) {
      return null; // or a loading message
    }

    return (
      <div className="TrackList">
        {searchResults.map((track) => (
          <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
          />
        ))}
      </div>
    );
  }
}

export default Tracklist;
