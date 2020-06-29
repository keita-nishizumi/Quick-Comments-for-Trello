import React from 'react';
import Search from '../Search/Search';
import Trello from '../../util/Trello';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleInput(e) {
        this.setState({query: e.target.value});
    }

    handleClick() {
        Trello.getCards(this.state.query);
    }

    handlePost() {
        //Hard coding ID to 'Test Comments' card.
        Trello.postComment("5ef92ed420bd840fd8421b01", this.state.query);
    }

    render() {
        return (
            <div className="methods-test">
                <button onClick={Trello.getAccessToken}>getAccessToken</button>
                <button onClick={Trello.getBoards}>getBoards</button>
                <input type="text" onChange={this.handleInput}/>
                <button onClick={this.handleClick}>getCards</button>
                <button onClick={Trello.getAllCards}>getAllCards</button>
                <button onClick={this.handlePost}>postComment</button>
                {/*<Search />*/}
            </div>
        )
    }
}

export default Test;