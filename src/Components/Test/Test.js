import React from 'react';
import Search from '../Search/Search';
import Trello from '../../util/Trello';

class Test extends React.Component {
    render() {
        return (
            <div className="methods-test">
                <button onClick={Trello.getAccessToken}>getAccessToken</button>
                <button onClick={Trello.getBoards}>getBoards</button>
                {/*<Search />*/}
            </div>
        )
    }
}

export default Test;