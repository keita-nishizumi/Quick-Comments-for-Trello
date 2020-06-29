import React from 'react';
import './CommentList.css';
import CardList from '../CardList/CardList'

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleKeywordChange(e) {
        this.props.onKeywordChange(e.target.value);
    }

    handlePost() {
        //TODO: post comments
        this.props.onPost();
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
                        onCommentChange={this.props.onCommentChange}
                    />
                <button className="CommentList-save" onClick={this.handlePost} >POST TO TRELLO</button>
            </div>
        )
    }
}

export default CommentList;