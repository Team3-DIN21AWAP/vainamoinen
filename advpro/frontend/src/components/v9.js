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

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
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
      borderWidth: 1,
    },
  ],
};

export function App() {
  return <Doughnut data={data} />;
}
export default V9
**
  /*
const V1 = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useCookie('token', '0');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const [chartData, setChart] = useState({
    datasets: [
    {
      label: '',
      data: [],
      borderColor: '',
      backgroundColor: '',
      parsing: {
        xAxisKey: "time",
        yAxisKey: "value",
      },
       pointRadius: 1,
     }
    ],
  });
    
  const navigate = useNavigate();
        
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

 
    const V2 = await axiosJWT.get('http://localhost:5000/v2',{ 
      headers: {
                Authorization: `Bearer ${token}`
              }
    });
    console.log(V2)     
            
    const data = {
        datasets: [
                    {
                      label: 'Global (NH+SH)/2 annual',
                      data: globalAnnual.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      pointRadius: 1,
                      options: {
                        scales: {
                          x: {
                              type: 'time',
                              time: {
                              unit: 'month'
                            }},
                        }
                      }
                    },
                    {
                      label: 'Global (NH+SH)/2 monthly',
                      data: globalMonthly.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(153, 162, 235)',
                      backgroundColor: 'rgba(153, 162, 235, 0.5)'
                    },
                    {
                      label: 'Northern hemisphere annual',
                      data: northAnnual.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(253, 62, 235)',
                      backgroundColor: 'rgba(253, 62, 235, 0.5)',
                    },
                    {
                      label: 'Northern hemisphere monthly',
                      data: northMonthly.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(253, 162, 35)',
                      backgroundColor: 'rgba(253, 162, 35, 0.5)',
                    },
                    {
                      label: 'Southern hemisphere monthly',
                      data: southMonthly.data,
                      borderColor: 'rgb(53, 162, 235)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                      label: 'Southern hemisphere annual',
                      data: southAnnual.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(53, 162, 135)',
                      backgroundColor: 'rgba(53, 162, 135, 0.5)',
                    },
                    {
                      label: '2000 y ...',
                      data: V2.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "anomalyC",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(353, 362, 35)',
                      backgroundColor: 'rgba(353, 362, 35, 0.5)',
                    }
                  ],
                };

                setChart(data);
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
  const [isHovering, setIsHovering] = useState(false);

        const handleMouseOver = () => {
          setIsHovering(true);
        };
      
        const handleMouseOut = () => {
          setIsHovering(false);
        };

    useEffect(() => {
         refreshToken();
         getUsers();
         getGlobalAnnualData();
    }, []);
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "HadCRUT5"
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {year:"YYYY"},
            unit: "month"
            
          }
        },
        
        yAxis: {
          type: "linear",
        },
      },
    };

  
        return (
            <><div onMouseOver={handleMouseOver} 
                   onMouseOut={handleMouseOut} 
                   style={{ height: "150px", width: "200px" }}>
            <Icon file={kuma} color={"#1DA1F2"} scale={10} 
                   style={{ height: "100px", width: "100px" }} />
             {isHovering && (
          <div>
            {name}
             <button onClick={Logout}>Log Out</button>
          </div>
        )}
            </div><><>
                <Line options={options} data={chartData} />
                <div>
                </div></><div></div></></>  
        )
};

export default V1
*/