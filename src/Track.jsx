// Track.js
import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    const { name, artist, album } = this.props;
    const { searchResults } = this.props;

    if (!searchResults) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>
            {artist} | {album}
          </p>
        </div>
        <button
          className="Track-action"
          onClick={() => this.props.onAdd(this.props.track)}
        >
          +
        </button>
        <button
          className="Track-action"
          onClick={() => this.props.onRemove(this.props.track)}
        >
          -
        </button>
      </div>
    );
  }
}

export default Track;
