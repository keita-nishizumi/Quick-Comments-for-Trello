import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import CommentList from '../CommentList/CommentList';
import Trello from '../../util/Trello';

import Test from '../Test/Test';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchMyBoards();
    this.state = {
      myBoards: [],
      searchResults: [
        {
          id: 'id01',
          name: 'card01',
          list: {
            id: 'listid01',
            name: 'listname01'
          },
          board: {
            id: 'boardid01',
            name: 'boardname01'
          },
          url: 'url01'
        },
        {
          id: 'id02',
          name: 'card02',
          list: {
            id: 'listid02',
            name: 'listname02'
          },
          board: {
            id: 'boardid02',
            name: 'boardname02'
          },
          url: 'url02'
        },
        {
          id: 'id03',
          name: 'card03',
          list: {
            id: 'listid03',
            name: 'listname03'
          },
          board: {
            id: 'boardid03',
            name: 'boardname03'
          },
          url: 'url03'
        }
      ],
      commentKeyword: 'plus! 0/0',
      commentListCards: [
        {
          id: 'id04',
          name: 'card04',
          list: {
            id: 'listid04',
            name: 'listname04'
          },
          board: {
            id: 'boardid04',
            name: 'boardname04'
          },
          url: 'url04',
          seq: 0
        },
        {
          id: 'id05',
          name: 'card05',
          list: {
            id: 'listid05',
            name: 'listname05'
          },
          board: {
            id: 'boardid05',
            name: 'boardname05'
          },
          url: 'url05',
          seq: 0
        }
      ]
    };

    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
    this.postComments = this.postComments.bind(this);
    this.search = this.search.bind(this);
  }

  async fetchMyBoards() {
    const myBoards = await Trello.getBoards();
    console.log("App -> fetchMyBoards -> myBoards", myBoards);
    this.setState({myBoards: myBoards});
  }

  updateKeyword(newKeyword) {
    this.setState({commentKeyword: newKeyword});
  }

  addCard(card) {
    // // console.log("App -> addCard -> card", card);
    let currentList = this.state.commentListCards;
    // // console.log("BEFORE FILTER: App -> addCard -> currentList", currentList)

    //Count cards that have same ID
    const newSeq = currentList.filter(e => e.id === card.id).length;
    // // console.log("AFTER FILTER: ", currentList);
    // // //console.log("App -> addCard -> seq", seq);
    let newCard = Object.assign({}, card);
    // console.log("App -> addCard -> card", card)
    newCard.seq = newSeq;
    // console.log("App -> addCard -> newCard", newCard)
    // // console.log("App -> addCard -> card.seq", card.seq);

    // console.log("BEFORE: App -> addCard -> currentList", currentList);
    currentList.push(newCard);
    // console.log("AFTER: App -> addCard -> currentList", currentList);
    this.setState({commentListCards: currentList});
  }

  removeCard(card) {
    //Do not remove other cards that has same ID
    this.setState({commentListCards: this.state.commentListCards.filter(e => e.id+e.seq !== card.id+card.seq)});
  }

  postComments() {
    let cardURIs = [];
    console.log('I will post these comments!');
  }

  search(term) {
    console.log("The search term is: ", term);
  }

  render() {
    return (
      <div>
        <h1>Quick<span className="highlight"> こめんと </span>for Trello</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
            myBoards={this.state.myBoards}
          />
          {/*Search Component goes here. props={this.onSearch} */}
          <div className="App-playlist" >
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addCard}
            />
            <CommentList
              commentKeyword={this.state.commentKeyword}
              commentListCards={this.state.commentListCards}
              onRemove={this.removeCard}
              onKeywordChange={this.updateKeyword}
              onPost={this.postComments}
            />
          </div>
        </div>
        <Test />
      </div>
    );}
}

export default App;
