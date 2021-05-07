import React, { Component } from "react";
import "./Message.scss";

class Message extends Component {
    constructor(props) {
        super(props);
        let temp = JSON.parse(this.props.message);
        let temp2 = temp.body.split("::")
        if (temp2.length === 3) {
            this.state = {
                time: temp2[0],
                pseudo: "<b>" + temp2[1] + "</b>",
                separator: " : ",
                message: temp2[2]
            };
        }
        else {
            this.state = {
                message: temp2[0]
            }
        }
    }

    render() {
        return <div className="Message">
            {this.state.time}
            {this.state.separator}

            {this.state.pseudo}

            {this.state.separator}
            {this.state.message}

        </div>;
    }
}

export default Message;
