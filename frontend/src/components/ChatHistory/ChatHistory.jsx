import React, { Component } from 'react';
import './ChatHistory.scss';
import Message from '../Message/Message';
import TokenService from '../Config/config';

class ChatHistory extends Component {

    logout() {
        TokenService.deleteToken()
        window.location.href = "";
    }

    render() {
        // console.log(this.props.chatHistory);
        const messages = this.props.chatHistory.map(msg => <Message key={msg.timeStamp} message={msg.data} />);

        // console.log(this.props.usersConnected);
        const usersConnected = this.props.usersConnected;

        return (
            <div className='ChatHistory'>
                <h2>Salon Public
                    <button className="deco" onClick={this.logout}>Se déconnecter</button>
                </h2>

                <h5>Utilisateur connecté : {usersConnected}</h5>
                
                {messages}
            </div>
        );
    };

}

export default ChatHistory;
