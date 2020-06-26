import React from 'react';
import './ListSelector.css';

class ListSelector extends React.Component {
    render() {
        return (
            <div className="ListSelector">
                <select>
                    <option value="">Choose a list...</option>
                        {this.props.lists.map(list => {
                            return <option key={list.id} value={list.id}>{list.name}</option>;
                        })}
                </select>
            </div>
        )
    }
}

export default ListSelector;