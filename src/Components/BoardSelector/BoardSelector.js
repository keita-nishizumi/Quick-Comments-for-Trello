import React from 'react';
import './BoardSelector.css';

class BoardSelector extends React.Component {
    render() {
        return (
            <div className="BoarcSelector">
                <select >
                    <option value="">Choose a board...</option>
                    {this.props.boards.map(board => {
                        return <option key={board.id} value={board.id}>{board.name}</option>;
                    })}
                </select>
            </div>
        )
    }
}

export default BoardSelector;