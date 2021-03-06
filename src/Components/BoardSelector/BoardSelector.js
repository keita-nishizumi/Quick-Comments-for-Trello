import React from 'react';
import './BoardSelector.css';

class BoardSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    //Enumerate fetched boards. If user selected list, then appropriate board will be selected automatically.
    getAllBoards(selectedList={}) {
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

    handleSelect(e) {
        this.props.onSelect(e.target.value);
    }

    //FIXME: When select one list, then select "Choose a list...", props.selectedBoard saves value but BoardSelector component will be reset.
    render() {
        return (
            <div className="BoardSelector">
                <select onChange={this.handleSelect}>
                    <option value="" selected>Choose a board...</option>
                    {this.getAllBoards(this.props.selectedList)}
                </select>
            </div>
        )
    }
}

export default BoardSelector;