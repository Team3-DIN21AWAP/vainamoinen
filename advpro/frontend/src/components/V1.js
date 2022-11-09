import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  
const V1 = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useCookie('token', '0');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [chartData, setChart] = useState({
        labels: [""],
        datasets: [
          {
            label: 'Dataset 1',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    const navigate = useNavigate();
    
        useEffect(() => {
            refreshToken();
            getUsers();
            getAnnualData();
        }, []);
        
        const refreshToken = async () => {
            try {
                const response = await axios.get('http://localhost:5000/token');
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
            } catch (error) {
                if (error.response) {
                    navigate("/")
                }
            }
        }
    
        const axiosJWT = axios.create();
    
        axiosJWT.interceptors.request.use(async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpire(decoded.exp);
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
  
        const getAnnualData = async () => {
            const response = await axiosJWT.get('http://localhost:5000/v1a',{ 
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            var labarr = [];
            var valarr = [];
            for(var x=0; x<response.data.length; ++x){
                labarr.push(response.data[x].time);
                valarr.push(response.data[x].anomalyC);
            }
            var chartDatat = {
                labels: labarr,
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: labarr.map( (value, index) => valarr[index] ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };
            setChart(chartDatat);
            
        }
    
        const getUsers = async () => {
            const response = await axiosJWT.get('http://localhost:5000/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        }
        
            
        const Logout = async () => {
                try {
                    await axios.delete('http://localhost:5000/logout');
                    navigate("/")
                } catch (error) {
                    console.log(error);
                }
            }
        return (
           
                <><h1>Welcome Back: {name}</h1>
                <Line options={options} data={chartData} />               
                <div>
                <button onClick={Logout}>
                    Log Out
                </button>
            </div><table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table></>   
        )
};

export default V1
