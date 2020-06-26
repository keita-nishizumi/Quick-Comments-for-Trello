import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.search = this.search.bind(this);
        //this.renderBoards = this.renderBoards(this);
    }

    handleTermChange(e) {
        this.setState({term: e.target.value});
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    /*renderBoards() {
        return this.props.myBoards.map(board => {
                return <option value={board.id}>{board.name}</option>;
            })
    }*/

    render() {
        return (
            <div className="SearchBar">
                <select className="BoardSelector">
                    <option value="">Choose a board...</option>
                    {this.props.myBoards.map(board => {
                        return <option key={board} value={board.id}>{board.name}</option>;
                    })}
                </select>
                <input placeholder="Enter A Card Name" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;