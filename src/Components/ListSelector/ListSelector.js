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

    isVisible(boardId) {
        if (!this.props.selectedBoard.id) {
            return true;
        } else {
            return this.props.selectedBoard.id === boardId;
        }
    }

    render() {
        return (
            <div className="ListSelector">
                <select onChange={this.handleSelect}>
                    <option value="">Choose a list...</option>
                    {this.props.lists.map(list => {
                        if (this.isVisible(list.idBoard)) {
                            return <option key={list.id} value={list.id}>{list.name}</option>;
                        }
                    })}
                </select>
            </div>
        )
    }
}

export default ListSelector;