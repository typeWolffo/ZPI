import React, {Component, useState} from "react";
import {TextField, Typography} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";
import '@fontsource/montserrat';
import {Redirect} from "react-router";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "../../features/User/Dashboard";

const styles = theme => ({
    // root: {
    //     background: 'rgb(195,195,195)'
    // },
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
    },
    input: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        marginBottom: "20px"
    },
    title: {
        fontFamily: "Montserrat",
        padding: "30px 0"
    }
});

axios.defaults.withCredentials = true;

class Login123 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameReg: '',
            passReg: '',
            user: '',
            password: '',
            loggedIn: false,
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    register() {
        if (this.state.usernameReg) {
            axios.post('http://localhost:8000/register', {
                username: this.state.usernameReg,
                password: this.state.passReg,
            }).then((response) => {
                console.log(response);
            })
        }
    }

    login() {
        if (this.state.user) {
            axios.post('http://localhost:8000/login', {
                username: this.state.user,
                password: this.state.password,
            }).then(async (response) => {
                console.log(response);
                await this.setState({loggedIn: true});
            })
        }
    }


    render() {

        const {classes} = this.props;
        return (
            <>
                {this.state.loggedIn
                    ? <Dashboard/>
                    :
                    <>
                    <Container className={classes.container}>
                        <Typography variant="h4"
                                    className={classes.title}>
                            Rejestracja</Typography>
                        <TextField className={classes.input}
                                   type="text"
                                   id="outlined-basic"
                                   label="Login"
                                   variant="outlined"
                                   onChange={(e) => {
                                       this.setState({usernameReg: e.target.value});
                                   }}/>

                        <TextField className={classes.input}
                                   type="password"
                                   id="outlined-basic"
                                   label="Hasło"
                                   variant="outlined"
                                   onChange={(e) => {
                                       this.setState({passReg: (e.target.value)})
                                   }}/>

                        <Button variant="outlined"
                                color="secondary"
                                onClick={this.register}>
                            Zarejestruj</Button>
                    </Container>

                    <Container className={classes.container}>
                    <Typography variant="h4"
                    className={classes.title}>
                    Logowanie</Typography>
                    <TextField className={classes.input}
                    type="text"
                    id="outlined-basic"
                    label="Login"
                    variant="outlined"
                    onChange={(e) => {
                    this.setState({user: (e.target.value)})
                }}/>

                    <TextField className={classes.input}
                    type="password"
                    id="outlined-basic"
                    label="Hasło"
                    variant="outlined"
                    onChange={(e) => {
                    this.setState({password: (e.target.value)})
                }}/>

                    <Button variant="outlined"
                    color="primary"
                    onClick={this.login}>
                    Zaloguj</Button>
                    </Container>
                    </>
                }
            </>
        )
    }
}

export default withStyles(styles)(Login123);