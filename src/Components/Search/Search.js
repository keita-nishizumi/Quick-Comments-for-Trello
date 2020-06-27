import React from 'react';
import './Search.css';
import BoardSelector from '../BoardSelector/BoardSelector';
import ListSelector from '../ListSelector/ListSelector';
import '../../util/Trello';
import Trello from '../../util/Trello';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            boards: [],
            lists: [],
            selectedBoard: {},
            selectedList: {}
        }

        this.selectBoard = this.selectBoard.bind(this);
        this.selectList = this.selectList.bind(this);
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

    selectBoard(board) {
        this.setState({selectedBoard: board});
    }

    //FIXME Choose a list...の行のせいでindexがずれている可能性があります
    selectList(idx) {
        this.setState({selectedList: this.state.lists[idx]})
    }

    handleSubmit(e) {
        console.log("Search -> handleSubmit -> e", e);
        //親コンポーネントに探してきて欲しいカードの情報を渡す
        //this.props.onSearch(e.target.value);
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
                    {/*Input field goes here */}
                    <input type="submit" className="SearchButton" value="SEARCH" />
                </form>
            </div>
        )
    }
}

export default Search;