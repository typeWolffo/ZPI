import React, {Component, useState} from "react";
import {TextField, Typography} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";
import '@fontsource/montserrat';

const styles = theme => ({
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameReg: '',
            passReg: '',
            user: '',
            password: ''
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
            }).then((response) => {
                console.log(response);
            })
        }
    }

    render() {

        const {classes} = this.props;
        return (
            <div>
                {/*REGISTER*/}
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

                {/*LOGIN*/}
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
            </div>
        )
    }
}

export default withStyles(styles)(Login);