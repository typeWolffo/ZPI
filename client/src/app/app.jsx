import React from 'react';
import Employee from "../models/employee";
import Timeline from "../components/timeline-component/timeline";

function App() {
    return (
        <div>
            <Timeline/>
            <Employee/>
        </div>
    );
}

export default App;