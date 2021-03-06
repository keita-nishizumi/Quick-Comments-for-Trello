import React from 'react';
import './BoardSelector.css';

class BoardSelector extends React.Component {
    //Enumerate fetched boards. If user selected list, then other boards should be filtered out.
    getAllBoards(selectedList="") {
        return (
            this.props.boards.map(board => {
                if (board.id === selectedList.idBoard) {
                    return <option key={board.id} value={board.id} selected>{board.name}</option>
                } else {
                    return <option key={board.id} value={board.id}>{board.name}</option>
                }
            })
        )
    }

    render() {
        return (
            <div className="BoarcSelector">
                <select>
                    <option value="" selected>Choose a board...</option>
                    {this.getAllBoards(this.props.selectedList)}
                </select>
            </div>
        )
    }
}

export default BoardSelector;