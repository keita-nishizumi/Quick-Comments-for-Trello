let accessToken = "";
const apiKey = process.env.REACT_APP_TRELLO_API_KEY;
const redirectURI = "http://localhost:3000/";
//const redirectURI = "https://quick-comments-for-trello.herokuapp.com/"
//TODO: After publishing, replace this redirect URI with new URL of this app.
//TODO: After publishing, add new URL to "Allowed Origins" list of my Trello account.
const baseUrl = 'https://trello.com/1';

const Trello = {
    getAccessToken(restart=false) {
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/#token=([^&]*)/);

        if(accessTokenMatch && !restart) {
            accessToken = accessTokenMatch[1];
            return accessToken;
        } else {
            const accessUrl = `https://trello.com/1/authorize?expiration=never&name=QuickCommentsForTrello&scope=read,write&response_type=token&key=${apiKey}&return_url=${redirectURI}`;
            window.location = accessUrl;
            console.log("Re-fetched accessToken: ", accessToken);
            return accessToken;
        }
    },

    getBoards() {
        const accessToken = Trello.getAccessToken();
        //TODO: If user already selected List, should only search the board in which the selected list.
        const url = `${baseUrl}/members/me/boards/?key=${apiKey}&token=${accessToken}`
        return fetch(url, {'method':'get'}).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err);
            return [];
        });
    },

    getLists(board) {
        const accessToken = Trello.getAccessToken();
        const url = `${baseUrl}/boards/${board.id}/lists/open?key=${apiKey}&token=${accessToken}`;
        return fetch(url, {'method':'get'}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.filter(list => !list.closed);
        }).catch(err => {
            console.log(err);
            return [];
        })
    },

    async getAllLists(boards) {
        const fetchArray = boards.map(async board => {
            const list = await Trello.getLists(board);
            return list;
        });
        const twoDimensionalResult = await Promise.all(fetchArray);
        console.log("getAllLists -> twoDimensionalResult", twoDimensionalResult);
        return twoDimensionalResult.flat();
    },

    getCards(term="", idList="", idBoard="") {
        try {
            if (term + idList + idBoard === "") {
                alert("Please set search conditions.");
                throw new Error('Please set search conditions.');
            }
            const accessToken = Trello.getAccessToken();

            if(term) {
                const url = `${baseUrl}/search/?key=${apiKey}&token=${accessToken}&modelTypes=cards&cards_limit=500&query=name:${term}`
                return fetch(url, {'method':'get'}).then(response => {
                    return response.json();
                }).then(jsonResponse => {
                    console.log("getCard -> jsonResponse.cards", jsonResponse.cards);
                    return jsonResponse.cards.filter(card => {
                        if (idList) {
                            return !card.closed && card.idList === idList;
                        } else if (idBoard) {
                            return !card.closed && card.idBoard === idBoard;
                        } else {
                            return !card.closed;
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    return [];
                })
            } else if (idList) {
                return Trello.getCardsByListOrBoard(idList, "lists");
            } else if (idBoard) {
                return Trello.getCardsByListOrBoard(idBoard, "boards");
            } else {
                throw new Error('Uncaught error.');
            }
        } catch(e) {
            alert(e);
        }
    },

    getCardsByListOrBoard(id, type) {
        try {
            if(type !== "lists" && type !== "boards") {
                throw new Error('Type must be "lists" or "boards".')
            }
            const accessToken = Trello.getAccessToken();
            const url = `${baseUrl}/${type}/${id}/cards/?key=${apiKey}&token=${accessToken}`;
            return fetch(url, {'method':'get'}).then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.filter(card => !card.closed);
            }).catch(err => {
                console.log(err);
                return [];
            })
        } catch(e) {
            console.log(e);
        }
    },

    //FIXME: This might be unnecessary method.
    getAllCards() {
        const accessToken = Trello.getAccessToken();
        const url = `${baseUrl}/members/me/cards/?key=${apiKey}&token=${accessToken}`
        return fetch(url, {'method': 'get'}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log("getAllCards -> jsonResponse", jsonResponse);
            return jsonResponse;
        }).catch(err => {
            console.log(err);
            return [];
        })
    },

    postComment(card, accessToken) {
        try {
            if(!card.comment) {
                throw new Error(`Please input some comments on "${card.name}".`);
            }
            //Method: POST /1/cards/[card id or shortlink]/actions/comments
            console.log("postComment -> id, comment", card.id, card.comment);
            const url = `${baseUrl}/cards/${card.id}/actions/comments?key=${apiKey}&token=${accessToken}&text=${card.comment}`;
            return fetch(url, {'method': 'post'}).then(response => {
                return response.json();
            }).then(jsonResponse => {
                console.log("postComment -> jsonResponse", jsonResponse);
                return jsonResponse;
            }).catch(err => {
                console.log("postComment -> err", err);
                return {};
            })
        } catch(err) {
            alert(err);
        }
    },

    //Trello doesn't provide batch requests for POST method.
    async postCommentsBatch(cards) {
        if (window.confirm('Are you sure to post these comments?')){
            const accessToken = Trello.getAccessToken();
            const fetchArray = cards.map(card => {
                return this.postComment(card, accessToken);
            }).filter(p => p); //remove undefined
            const result = await Promise.all(fetchArray);
            return result;
        }
    }
};

export default Trello;