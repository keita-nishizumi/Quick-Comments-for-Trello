import React from 'react';
import './Search.css';
import BoardSelector from '../BoardSelector/BoardSelector';
import ListSelector from '../ListSelector/ListSelector';
import SearchTerm from '../SearchTerm/SearchTerm';
import '../../util/Trello';
import Trello from '../../util/Trello';

const initBoard = {
    id: ""
};

const initList = {
    id: "",
    idBoard: ""
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            boards: [],
            lists: [],
            selectedBoard: initBoard,
            selectedList: initList
        }

        this.selectBoard = this.selectBoard.bind(this);
        this.selectList = this.selectList.bind(this);
        this.updateTerm = this.updateTerm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //はじめに非同期通信でボード一覧を取得する。次に、取得したボードを使ってリストを更新する
    //TODO:ボードが選択される度にリスト一覧が更新されるようにする
    //TODO:リスト一覧は増えすぎる可能性があるので、クエリ制限をかけた方がいいかな？
    //TODO:そもそもボードを選択する度に毎回リスト取得の通信をする必要ってあるの？？
    async componentDidMount() {
        const myBoards = await Trello.getBoards();
        console.log("Search -> componentDidMount -> myBoards", myBoards);
        const myLists = await Trello.getAllLists(myBoards);
        this.setState ({
            boards: myBoards,
            lists: myLists
            });
        //this.search = this.search.bind(this);
    }

    /*search() {
        this.props.onSearch(this.state);
    }*/

    selectBoard(id) {
        const b = this.state.boards.find(board => {return board.id === id});
        if(typeof b === "undefined") {
            this.setState({selectedBoard: initBoard});
        } else {
            this.setState({selectedBoard: b});
            //if board and selected list are not match, then reset the list.
            if(b.id !== this.state.selectedList.idBoard) {
                this.setState({selectedList: initList});
            }
        }
    }

    selectList(id) {
        const l = this.state.lists.find(list => {return list.id === id});
        if(typeof l === "undefined") {
            this.setState({selectedList: initList});
        } else {
            this.setState({selectedList: l});
            //if list and selected board are not match, then reset the board.
            if (this.state.selectedBoard.id !== l.idBoard && l.id !== "") {
                this.setState({selectedBoard: initBoard})
            }
        }
    }

    updateTerm(term) {
        this.setState({term: term});
    }

    async handleSubmit(e) {
        e.preventDefault();
        //Give the term, listID, and boardID to Trello.getCards() method,
        //then add board name & list name property to each card object.
        let searchResults = await Trello.getCards(this.state.term, this.state.selectedList.id, this.state.selectedBoard.id);
        if (searchResults) {
            searchResults.map(card => {
                //add two property to card object
                card.board = this.state.boards.find(b => b.id === card.idBoard);
                card.list = this.state.lists.find(l => l.id === card.idList);
            })
            this.props.onSearch(searchResults);
        }
    }

    render() {
        return(
            <div className="Search">
                <form onSubmit={this.handleSubmit}>
                    <BoardSelector
                        boards={this.state.boards}
                        selectedList={this.state.selectedList}
                        onSelect={this.selectBoard}
                    />
                    <ListSelector
                        lists={this.state.lists}
                        selectedBoard={this.state.selectedBoard}
                        onSelect={this.selectList}
                    />
                    <SearchTerm
                        onTermChange={this.updateTerm}
                    />
                    <input type="submit" className="SearchButton" value="SEARCH"/>
                </form>
            </div>
        )
    }
}

export default Search;