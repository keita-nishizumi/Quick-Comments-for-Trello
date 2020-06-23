import React from 'react';
import './SearchResults.css';
import CardList from '../CardList/CardList';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <CardList
                    cards={this.props.searchResults}
                    isRemoval={false}
                    onAdd={this.props.onAdd}
                />
            </div>
        )
    }
}

export default SearchResults;