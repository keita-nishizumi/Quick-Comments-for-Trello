let accessToken = "";
const apiKey = process.env.REACT_APP_TRELLO_API_KEY; //TrelloのAPI Keyで、なんか検索するとよく出てくる方
const redirectURI = "http://localhost:3000/";
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
            const accessUrl = `https://trello.com/1/authorize?expiration=never&name=QuickCommentsForTrello&scope=read&response_type=token&key=${apiKey}&return_url=${redirectURI}`;
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
            console.log("getBoards -> response", response)
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
            return jsonResponse;
        }).catch(err => {
            console.log(err);
            return [];
        });
    },

    getLists(board) {
        const accessToken = Trello.getAccessToken();
        const url = `${baseUrl}/boards/${board.id}/lists?key=${apiKey}&token=${accessToken}`;
        return fetch(url, {'method':'get'}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log("getLists -> jsonResponse", jsonResponse)
            return jsonResponse;
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
        console.log("fetchArray: ",fetchArray);
        const twoDimensionalResult = await Promise.all(fetchArray);
        console.log("getAllLists -> twoDimensionalResult", twoDimensionalResult);
        return twoDimensionalResult.flat();
    },

    getCards(name) {
        console.log("getCards -> name", name);
        const accessToken = Trello.getAccessToken();
        const url = `${baseUrl}/search/?key=${apiKey}&token=${accessToken}&modelTypes=cards&query=${name}`
        return fetch(url, {'method':'get'}).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log("getCard -> jsonResponse.cards", jsonResponse.cards);
            return jsonResponse.cards;
        }).catch(err => {
            console.log(err);
            return [];
        })
    }
};

export default Trello;