import React from 'react';
import './App.css';
import Search from '../Search/Search';
import SearchResults from '../SearchResults/SearchResults';
import CommentList from '../CommentList/CommentList';
import Trello from '../../util/Trello';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBoards: [],
      searchResults: [],
      commentKeyword: 'plus! 0/0',
      commentListCards: []
    };

    this.addCard = this.addCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
    this.postComments = this.postComments.bind(this);
    this.changeResults = this.changeResults.bind(this);
    this.changeComment = this.changeComment.bind(this);
  }

  updateKeyword(newKeyword) {
    this.setState({commentKeyword: newKeyword});
  }

  addCard(card) {
    let currentList = this.state.commentListCards;
    const newSeq = currentList.filter(e => e.id === card.id).length;
    let newCard = Object.assign({}, card); //copy object so that user can add same card several times.
    newCard.seq = newSeq; //add seq property to the new added card in order to distinguish those cards which has same id.
    currentList.push(newCard);
    this.setState({commentListCards: currentList});
  }

  removeCard(card) {
    //Do not remove other cards that has same ID
    this.setState({
      commentListCards: this.state.commentListCards.filter(e => e.id+e.seq !== card.id+card.seq)
    });
  }

  changeResults(searchResults) {
    this.setState({searchResults: searchResults});
    console.log("App -> changeResults -> searchResults", searchResults);
  }

  changeComment(id, seq, text) {
    const targetCard = this.state.commentListCards.find(card => {
      return (card.id === id && card.seq === seq);
    });
    targetCard.comment = text;
  }

  async postComments() {
    const results = await Trello.postCommentsBatch(this.state.commentListCards);
    const resultMessage = `${results.length} comments are succesfully posted.`;
    alert(resultMessage);
    this.setState({commentListCards: []});
  }

  render() {
    return (
      <div>
        <h1>Quick<span className="highlight"> こめんと </span>for Trello</h1>
        <div className="App">
          <Search onSearch={this.changeResults}/>
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
              onCommentChange={this.changeComment}
              onPost={this.postComments}
            />
          </div>
        </div>
      </div>
    );}
}

export default App;
