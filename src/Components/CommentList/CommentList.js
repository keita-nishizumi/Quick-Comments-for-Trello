import React from 'react';
import './CommentList.css';
import CardList from '../CardList/CardList'

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
    }

    handleKeywordChange(e) {
        this.props.onKeywordChange(e.target.value);
    }

    render() {
        return (
            <div className="CommentList">
                    <h2>Comments</h2>
                <div className="commentKeyword">
                    <p>Key word: </p>
                    <input value={this.props.commentKeyword} onChange={this.handleKeywordChange}/>
                </div>
                    <CardList
                        cards={this.props.commentListCards}
                        isRemoval={true}
                        onRemove={this.props.onRemove}
                        commentKeyword={this.props.commentKeyword}
                    />
                <button className="CommentList-save" onClick={this.props.onPost} >POST TO TRELLO</button>
            </div>
        )
    }
}

export default CommentList;