import React from 'react';
import './ListSelector.css';

class ListSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        this.props.onSelect(e.target.value);
    }

    render() {
        return (
            <div className="ListSelector">
                <select onChange={this.handleSelect}>
                    <option value="">Choose a list...</option>
                        {this.props.lists.map((list, idx) => {
                            return <option key={list.id} value={idx}>{list.name}</option>;
                        })}
                </select>
            </div>
        )
    }
}

export default ListSelector;