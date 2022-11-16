import { useState, useEffect} from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import useCookie from 'react-use-cookie';
import Moment from 'moment';
import {Icon} from "react-3d-icons";
import {kuma} from "react-3d-icons";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";

  
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

  const getGlobalAnnualData = async () => {
    const globalAnnual = await axiosJWT.get('http://localhost:5000/v1ga',{ 
       headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    const globalMonthly = await axiosJWT.get('http://localhost:5000/v1gm',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    const northAnnual = await axiosJWT.get('http://localhost:5000/v1na',{ 
      headers: {
                Authorization: `Bearer ${token}`
              }
    });

    const  northMonthly = await axiosJWT.get('http://localhost:5000/v1nm',{ 
      headers: {
                Authorization: `Bearer ${token}`
              }
    });

    const southMonthly = await axiosJWT.get('http://localhost:5000/v1sm',{ 
      headers: {
                Authorization: `Bearer ${token}`
              }
    });

    const southAnnual = await axiosJWT.get('http://localhost:5000/v1sa',{ 
      headers: {
                Authorization: `Bearer ${token}`
              }
    });

    var GAX = [];
    var GAY = [];
    var GMX = [];
    var GMY = [];
    var NMX = [];
    var NMY = [];
    var NAX = [];
    var NAY = [];
    var SMX = [];
    var SMY = [];
    var SAX = [];
    var SAY = [];

    for( var x=0; x<globalAnnual.data.length; ++x){
      GAX.push(globalAnnual.data[x].time);
      GAY.push(globalAnnual.data[x].anomalyC);
    }
          
    for(x=0; x<globalMonthly.data.length; ++x){
      GMX.push(globalMonthly.data[x].time);
      GMY.push(globalMonthly.data[x].anomalyC);
    }
    for( var x=0; x<northAnnual.data.length; ++x){
      NAX.push(northAnnual.data[x].time);
      NAY.push(northAnnual.data[x].anomalyC);
    }
          
    for(x=0; x<northMonthly.data.length; ++x){
      NMX.push(northMonthly.data[x].time);
      NMY.push(northMonthly.data[x].anomalyC);
    }
    for( var x=0; x<northAnnual.data.length; ++x){
      NAX.push(northAnnual.data[x].time);
      NAY.push(northAnnual.data[x].anomalyC);
    }
          
    for(x=0; x<southMonthly.data.length; ++x){
      SMX.push(southMonthly.data[x].time);
      SMY.push(southMonthly.data[x].anomalyC);
    }
    for(x=0; x<southAnnual.data.length; ++x){
      SAX.push(southAnnual.data[x].time);
      SAY.push(southAnnual.data[x].anomalyC);
    }
            
    const data = {
        labels: GAX,GMX, NMX, NAX, SAX, SMX,
      
        datasets: [
                    {
                      label: 'Golbal Annual',
                      data: GAX.map( (value, index) => GAY[index] ),
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
                    },
                    {
                      label: 'Global Monthly',
                      data: GMX.map( (value, index) => GMY[index] ),
                      borderColor: 'rgb(153, 162, 235)',
                      backgroundColor: 'rgba(153, 162, 235, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
                    },
                    {
                      label: 'North Annual',
                      data: NAX.map( (value, index) => NAY[index] ),
                      borderColor: 'rgb(253, 62, 235)',
                      backgroundColor: 'rgba(253, 62, 235, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
                    },
                    {
                      label: 'North Monthly',
                      data: NMX.map( (value, index) => NMY[index] ),
                      borderColor: 'rgb(253, 162, 35)',
                      backgroundColor: 'rgba(253, 162, 35, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
                    },
                    {
                      label: 'South Monthly',
                      data: SMX.map( (value, index) => SMY[index] ),
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
                    },
                    {
                      label: 'South Annual',
                      data: SAX.map( (value, index) => SAY[index] ),
                      borderColor: 'rgb(53, 162, 135)',
                      backgroundColor: 'rgba(53, 162, 135, 0.5)',
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "value",
                      },
                      pointRadius: 1,
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
          text: "Time Line Graph ",
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
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
