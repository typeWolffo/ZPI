import React, {Component} from "react";
import axios from "axios";
import {defaults} from "react-chartjs-2";

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
            params: {
                table: 'Employee'
            },
        }).then((response) => {
            this.setState({
                login: response.data[0].login,
            })
            console.log(this.state.login)
        });
    }

    render() {
            return <div>{this.state.login}</div>
    }
}

export default Employee;