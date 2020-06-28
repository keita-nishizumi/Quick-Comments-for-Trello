import React from 'react';
import './SearchTerm.css';

class SearchTerm extends React.Component {
    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(e) {
        this.props.onTermChange(e.target.value);
    }

    render() {
        return (
            <div className="SearchTerm">
                <input placeholder="Enter A Card Name" onChange={this.handleTermChange}/>
            </div>
        )
    }
}

export default SearchTerm;