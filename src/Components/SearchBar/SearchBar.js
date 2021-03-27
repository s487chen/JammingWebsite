import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({term:e.target.value});
    }

    render() {
        return (
        <div className="SearchBar">
            <input onChange={this.handleTermChange} value={this.state.term} placeholder="Enter A Song, Album, or Artist" />
            <button onClick={this.search} className="SearchButton">SEARCH</button>
        </div>
        );
    }
}

export default SearchBar;