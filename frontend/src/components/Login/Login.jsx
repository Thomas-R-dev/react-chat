import React, { Component } from 'react';
import './Login.scss';
import TokenService from '../Config/config';
import MyIp from 'public-ip';
// import {
//     BrowserRouter as Router,
//     Redirect,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            erreur: null,
            ipv4: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {

        (async () => {
            this.setState({ ipv4: await MyIp.v4() });
        })()

        if (this.state.value.length === 0) {
            this.setState({ erreur: "Ne pas mettre un pseudo vide !" })
            // console.log("Ne pas mettre un pseudo vide !")
        } else if (this.state.value.length > 15) {
            this.setState({ erreur: "Pseudo trop long (15 max) !" })
            // console.log("Pseudo trop long (15 max) !")
        } else if (this.state.value.length < 3) {
            this.setState({ erreur: "Pseudo trop court (3 min) !" })
            // console.log("Pseudo trop court (3 min) !")
        } else if (this.state.ipv4 !== "93.1.76.4" && this.state.value.toLowerCase() === "admin") {
            this.setState({ erreur: "Vous n'êtes pas un Admin !" })
        }
        else {
            TokenService.setToken(this.state.value.replace(/<[^>]+>/g, ''))
            window.location.href = "";
            // return <Redirect to='/Chat' />
            // console.log(this.state.value);
        }
        event.preventDefault();
    }

    render() {
        // (async () => {
        //     console.log(await MyIp.v4());
        // })()
        return (
            <div className='Login'>
                <h2>Se Connecter</h2>
                <br /><br />

                <div className="formLogin">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Identifiant : <input type="text" value={this.state.value} onChange={this.handleChange} />
                            <br />
                        </label>
                        <input type="submit" value="Envoyer" />
                        <div className="erreur">{this.state.erreur}</div>
                    </form>
                </div>
            </div>
        );
    };

}

export default Login;
