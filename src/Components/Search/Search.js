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
            boardSelected: false
        }
    }

    //はじめに非同期通信でボード一覧を取得する。次に、取得したボードを使ってリストを更新する
    //TODO:ボードが選択される度にリスト一覧が更新されるようにする
    //TODO:リスト一覧は増えすぎる可能性があるので、クエリ制限をかけた方がいいかな？
    //TODO:そもそもボードを選択する度に毎回リスト取得の通信をする必要ってあるの？？
    async componentDidMount() {
        const myBoards = await Trello.getBoards();
        console.log("Search -> componentDidMount -> myBoards", myBoards);
        //const myLists = await Trello.getLists();
        const myLists = await Trello.getAllLists(myBoards);
        this.setState ({
            boards: myBoards,
            lists: myLists
            });

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.search = this.search.bind(this);
    }

    /*search() {
        this.props.onSearch(this.state);
    }*/

    handleSubmit(e) {
        console.log("Search -> handleSubmit -> e", e);
        //親コンポーネントに探してきて欲しいカードの情報を渡す
        //this.props.onSearch(e.target.value);
    }

    render() {
        return(
            <div className="Search">
                <form onSubmit={this.handleSubmit}>
                    <BoardSelector boards={this.state.boards} />
                    <ListSelector lists={this.state.lists} />
                    {/*Input field goes here */}
                    <input type="submit" className="SearchButton" value="SEARCH" />
                </form>
            </div>
        )
    }
}

export default Search;