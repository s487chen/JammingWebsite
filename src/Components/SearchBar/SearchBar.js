import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    search() {
        this.props.onSearch(this.props.term);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    render() {
        return (
        <div className="SearchBar">
            <input onChange={this.handleNameChange} value={this.props.term} placeholder="Enter A Song, Album, or Artist" />
            <button onClick={this.search} className="SearchButton">SEARCH</button>
        </div>
        );
    }
}

export default SearchBar;