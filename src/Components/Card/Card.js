import React from 'react';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    addCard() {
        this.props.onAdd(this.props.card);
        // console.log("Card -> addCard -> this.props.onAdd", this.props.onAdd)
        // console.log("Add this Card -> addCard -> this.props.card", this.props.card);
    }

    removeCard() {
        this.props.onRemove(this.props.card);
        //console.log("Card -> removeCard -> this.props.onRemove", this.props.onRemove);
    }

    renderAction() {
        return this.props.isRemoval ?
            <button className="Card-action" onClick={this.removeCard}>-</button>
            :
            <button className="Card-action" onClick={this.addCard}>+</button>;
    }

    handleCommentChange(e) {
        this.props.onCommentChange(this.props.card.id, this.props.card.seq, e.target.value);
        //console.log("Card -> handleCommentChange -> this.props.card.id, this.props.card.seq, e.target.value", this.props.card.id, this.props.card.seq, e.target.value);
    }

    renderCommentField() {
        if (this.props.isRemoval) {
            return (
                <input
                    className="Comment-field"
                    defaultValue={this.props.commentKeyword + " "}
                    onChange={this.handleCommentChange}
                />
            )
        }
    }

    render() {
        return (
            <div className="Card">
                <div className="Main">
                    <div className="Card-information">
                        <h3>{this.props.card.name}</h3>
                        <p>{this.props.card.board.name} | {this.props.card.list.name}</p>
                    </div>
                    {this.renderAction()}
                </div>
                {this.renderCommentField()}
            </div>
        )
    }
}

export default Card;