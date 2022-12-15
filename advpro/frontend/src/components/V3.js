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
import bgVideo from "./PlanetEarthSpinningSpace.mp4"
import "./index.css";


  
const V3 = () => {
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

  const chartV3 = async () => {
    const V3a = await axiosJWT.get('http://localhost:5000/v3a',{ 
       headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    const V3m = await axiosJWT.get('http://localhost:5000/v3m',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });

         
            
    const data = {
        datasets: [
                    {
                      label: 'Atmospheric CO2 concentrations',
                      data: V3a.data,
                      parsing: {
                        xAxisKey: "year",
                        yAxisKey: "mean",
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
                      label: 'Atmospheric CO2',
                      data: V3m.data,
                      parsing: {
                        xAxisKey: "date",
                        yAxisKey: "average",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(153, 162, 235)',
                      backgroundColor: 'rgba(153, 162, 235, 0.5)'
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
         chartV3();
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
            <>
            <div class>
            <div onMouseOver={handleMouseOver} 
                        onMouseOut={handleMouseOut} 
                        style={{ height: "100px", width: "100px" }}>
                        <Icon file={kuma} color={"#1DA1F2"} scale={10} 
                        style={{ height: "100px", width: "100px" }} />
                  {isHovering && (
                        <div>
                          {name}
                          <button onClick={Logout}>Log Out</button>
                        </div>)}
                  </div>
                <Line options={options} data={chartData} />
                  <div>
                  <p>Visualization 3 - Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958.<br>
                  The line graph is toggleable to either annual or monthly data showing mean CO2 levels in the air<br>
                  as measured from the top of a 38m tall tower next to the Mauna Lua Observatory, Hawaii.<br>
                  As such the dataset constitutes the longest record of direct measurements of CO2 in the atmosphere.<br>
                  The graph's Y-axis shows CO2 ppm and X-axis time. A note about data obtainment:<br>
                  Data from March 1958 through April 1974 have been obtained by C. David Keeling<br>
                  of the Scripps Institution of Oceanography (SIO) and were obtained from the<br>
                  Scripps website (scrippsco2.ucsd.edu).<br>
<br>
                  Data source:<br>
                  <a href="https://gml.noaa.gov/ccgg/trends/data.html">https://gml.noaa.gov/ccgg/trends/data.html</a><br>
                  Monthly:<br>
                  <a href="https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv">https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv</a><br>
                  Annual:<br>
                  <a href="https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv">https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_annmean_mlo.csv</a><br>
<br>
                  Measurement description:<br>
                  <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">https://gml.noaa.gov/ccgg/about/co2_measurements.html</a><br>
<br>
                  Dr. Pieter Tans, NOAA/GML (gml.noaa.gov/ccgg/trends/) and Dr. Ralph Keeling, Scripps Institution of Oceanography (scrippsco2.ucsd.edu/).<br>
                  </p>
                  </div>
            </div> 
                   </>
        )
};

export default V3
