import React, {Component} from 'react';
import axios from 'axios';
import {Chart} from "react-google-charts";


class Timeline extends Component {
    state = {
        responseVehiclesData: '',
        responseEmployeesData: '',
    }


    componentDidMount() {
        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
            params: {
                table: 'vehicles'
            },
        }).then((response) => {
            const responseVehiclesData = response.data[0];
            this.setState({responseVehiclesData});
            console.log(responseVehiclesData)
        });

        axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
            params: {
                table: 'employees'
            },
        }).then((response) => {
            const responseEmployeesData = response.data;
            this.setState({responseEmployeesData});
            console.log(responseEmployeesData)
        });
    }



    render() {

        return (
            <div>
                <Chart
                    width={'auto'}
                    height={'300px'}
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            {type: 'string', id: 'Employee'},
                            {type: 'date', id: 'Start'},
                            {type: 'date', id: 'End'},
                        ],
                        [`${this.state.responseEmployeesData ? this.state.responseEmployeesData[0].name : ''}`, new Date(1789, 3, 30), new Date(1797, 2, 4)],
                        ['Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
                        ['Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)],
                    ]}
                    options={{
                        showRowNumber: true,
                    }}
                    rootProps={{'data-testid': '1'}}
                />
            </div>

        )
    }
}

export default Timeline;
