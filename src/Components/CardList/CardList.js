import React from 'react';
import './CardList.css';
import '../Card/Card';
import Card from '../Card/Card';

class CardList extends React.Component {
    render() {
        return (
            <div className="CardList">
                {this.props.cards.map(card => {
                    return (
                        <Card
                            key={card.id + '-' + card.seq}
                            card={card}
                            isRemoval={this.props.isRemoval}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            commentKeyword={this.props.commentKeyword}
                            onCommentChange={this.props.onCommentChange}
                        />)
                })}
            </div>
        )
    }
}

export default CardList;