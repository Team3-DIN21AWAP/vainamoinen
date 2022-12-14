/*import { useState, useEffect} from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import useCookie from 'react-use-cookie';
import Moment from 'moment';
*/
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import "chartjs-adapter-luxon";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function V9() {
    const [name, setName] = useState('');
    const [token, setToken] = useCookie('token', '0');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [chartData, setChart] = useState({
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: '',
            borderColor: '',
            borderWidth: 1
           }
          ],
        });
// setup block

const data = {
       labels: ['Energy', 'Industrial processes', 'Waste', 'Agriculture, Forestry & Land Use (AFOLU)'],

            setChart(data);
}


  /*
  labels: ['Energy', 'Industrial processes', 'Waste', 'Agriculture, Forestry & Land use'],
  datasets: [
    {
      label: 'Emissions by sector',
      data: [73.2, 5.2, 3.2, 18.4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    },
  ],
};*/

/* const getV9BaseData = async () => {
    const baseData = await axiosJWT.get('http://localhost:5000/v9',{ 
        headers: {
                Authorization: `Bearer ${token}`
                }
    });

    const getV9Energy = await axiosJWT.get('http://localhost:5000/v9ene',{ 
        headers: {
                Authorization: `Bearer ${token}`
                }
    });

    const getV9InduPro = await axiosJWT.get('http://localhost:5000/v9indu',{ 
        headers: {
                Authorization: `Bearer ${token}`
                }
    });

    const getV9Waste = await axiosJWT.get('http://localhost:5000/v9waste',{ 
        headers: {
                Authorization: `Bearer ${token}`
                }
    });

    const getV9Agri = await axiosJWT.get('http://localhost:5000/v9agri',{ 
        headers: {
                Authorization: `Bearer ${token}`
                }
    });
}*/

export function App() {
    return <Doughnut data={data} />;
}

