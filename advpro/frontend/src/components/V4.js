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


  
const V4 = () => {
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

    const V41 = await axiosJWT.get('http://localhost:5000/v41',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });
    const V42 = await axiosJWT.get('http://localhost:5000/v42',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });
    const V43 = await axiosJWT.get('http://localhost:5000/v43',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });

         
            
    const data = {
        datasets: [
                    {
                      label: 'Antarctic Ice Core CO2 1',
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
                      label: 'Antarctic Ice Core CO2 2',
                      data: V41.data,
                      parsing: {
                        xAxisKey: "year",
                        yAxisKey: "co2",
                      },
                      pointRadius: 1,
                      borderColor: 'rgb(153, 162, 235)',
                      backgroundColor: 'rgba(153, 162, 235, 0.5)'
                    },
                    {
                        label: 'Global (NH+SH)/2 monthly',
                        data: V42.data,
                        parsing: {
                          xAxisKey: "year",
                          yAxisKey: "co2",
                        },
                        pointRadius: 1,
                        borderColor: 'rgb(253, 162, 135)',
                        backgroundColor: 'rgba(253, 162, 135, 0.5)'
                      },
                      {
                        label: 'Antarctic Ice Core CO2 3',
                        data: V43.data,
                        parsing: {
                          xAxisKey: "year",
                          yAxisKey: "co2",
                        },
                        pointRadius: 1,
                        borderColor: 'rgb(353, 162, 235)',
                        backgroundColor: 'rgba(353, 162, 235, 0.5)'
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
                      <p>Visualization 4 - Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements<br>
                      The line graph displays the annual data of three ice core samples and the CO2 measurements of Mauna Loa Observatory.<br>
                      The graph's Y-axis shows CO2 ppm and X-axis time. The derived ice core samples were obtained at Law Dome, East Antarctica<br>
                      from 1987 to 1993. For information about Mauna Loa Observatory measurements, please read above (Visualization 3).<br>
<br>
                      Data source:<br>
                      <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat">https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat</a><br>
<br>
                      Research and method information:<br>
                      <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html">https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html</a><br>
<br>
                      D.M. Etheridge, L.P. Steele, R.L. Langenfelds, R.J. Francey, J.-M. Barnola and V.I. Morgan. 1998. Historical CO2 records from the Law Dome DE08, DE08-2, and DSS ice cores. In Trends: A Compendium of Data on Global Change. Carbon Dioxide Information Analysis Center, Oak Ridge National Laboratory, U.S.<br> Department of Energy, Oak Ridge, Tenn., U.S.A.
                      </p>
                  </div>
            </div> 
                   </>
        )
};

export default V4
