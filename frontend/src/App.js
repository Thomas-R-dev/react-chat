import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChatHistory from './components/ChatHistory/ChatHistory';
import ChatInput from './components/ChatInput/ChatInput';
import Login from './components/Login/Login';
import './App.css';
import { connect, sendMsg } from './api';
import TokenService from './components/Config/config'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [],
            usersConnected: "0"
        }
    }

    componentDidMount() {
        if (TokenService.isLogged()) {
            connect((msg) => {

                // console.log(msg.data)
                var temp = JSON.parse(msg.data)
                // console.log(temp)
                if (temp.type === 2) {
                    this.setState({
                        usersConnected: temp.body
                    })
                }
                else {
                    this.setState(prevState => ({
                        chatHistory: [...prevState.chatHistory, msg],
                    }))
                }

                // console.log(this.state);
            })
        } else {
            console.log("Non connecté")
        }
    }

    send(event) {
        if (event.keyCode === 13) {
            sendMsg(JSON.stringify({ Type: "msg", Body: event.target.value }))
            event.target.value = "";
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                {TokenService.isLogged()
                    ? <><ChatHistory chatHistory={this.state.chatHistory} usersConnected={this.state.usersConnected} /> <ChatInput send={this.send} /></>
                    : <Login />
                }
                <Footer />
            </div>
        );
    }
}

export default App;
