import React, {Component, useState} from "react";
import {TextField} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";

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
    });

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameReg: '',
            passReg: ''
        };
    }

    register() {
        axios.post('http://localhost:8000/register', {
            username: this.usernameReg,
            password: this.passReg,
        }).then((response) =>{
            console.log(response);
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Container className={classes.container}>
                    <h1>Rejestracja</h1>
                    <TextField className={classes.input} type="text" id="outlined-basic" label="Login"
                               variant="outlined"
                               onChange={(e) => {
                                   this.setState({usernameReg: e.target.value});
                               }}
                    />
                    <TextField className={classes.input} type="password" id="outlined-basic" label="Hasło"
                               variant="outlined" onChange={(e) => {
                        this.setState({passReg: e.target.value})
                    }}
                    />
                    <Button onClick={this.register} variant="outlined" color="secondary">Zarejestruj</Button>
                </Container>
                <Container className={classes.container}>
                    <h1>Logowanie</h1>
                    <TextField className={classes.input} type="text" id="outlined-basic" label="Login"
                               variant="outlined"/>
                    <TextField className={classes.input} type="password" id="outlined-basic" label="Hasło"
                               variant="outlined"/>
                    <Button variant="outlined" color="primary">Zaloguj</Button>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(Login);