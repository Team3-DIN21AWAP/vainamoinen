import React from 'react';
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2"



const dates = [];

const data = { 
    dates: dates, 
    datasets: [
        {
            label: "CO2 measurements from Vostok Ice Core",
            backgroundColor: "rgba(255, 255, 255,)",
            borderColor: "rgba(255, 255, 255)",
            data: []
        },
    ],
};

const V5 = () => {
    return (
        <div>
            <Line data={data} />
        </div>
    );
};


export default V5;