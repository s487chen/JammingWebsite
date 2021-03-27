import './TrackList.css';
import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
   
        const listItems =  this.props.tracks.map((track)=>{
            return <Track key={track.id} onRemove={this.props.onRemove}  isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} track={track} />;
        })
        
        return (
            <div className="TrackList">
                {listItems}
            </div>
        );
    }
}

export default TrackList;