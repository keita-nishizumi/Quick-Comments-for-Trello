import React from 'react';
import Trello from '../../util/Trello';

class Test extends React.Component {
    render() {
        return (
            <div className="methods-test">
                <button onClick={Trello.getAccessToken}>getAccessToken</button>
                <button onClick={Trello.getBoards}>getBoards</button>
            </div>
        )
    }
}

export default Test;