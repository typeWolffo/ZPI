import React, {Component} from "react";
import axios from "axios";

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            surname : '',
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
            params: {
                table: 'employees'
            },
        }).then((response) => {
            this.setState({
                name: response.data[0].name,
                surname: response.data[0].surname,
            })
            console.log(this.state.name)
        });
    }
    render() {
        return <div>{this.state.name}</div>
    }
}
export default Employee;