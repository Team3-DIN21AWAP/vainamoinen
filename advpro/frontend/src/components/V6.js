import { useState, useEffect} from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import useCookie from 'react-use-cookie';
import {Icon} from "react-3d-icons";
import {kuma} from "react-3d-icons";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import bgVideo from "./PlanetEarthSpinningSpace.mp4"
import "./index.css";



  
const V6 = () => {
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

  const getData = async () => {
    const V6 = await axiosJWT.get('http://localhost:5000/v6',{ 
       headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    console.log(V6)     
          
    const data = {
        datasets: [
                    {
                      label: 'CO2 ppm over 800k years',
                      data: V6.data,
                      parsing: {
                        xAxisKey: "ageofgasBP",
                        yAxisKey: "CO2 ppm",
                      },
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      pointRadius: 1,
                      options: {
                        
                      }
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
         getData();
    }, []);
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Antarctic Ice Core"
        },
      },
      scales: {
        x: {
          type: "linear",
        },
        
        yAxis: {
          type: "linear",
        },
      },
    };

  
        return (
            <>
            <div class="content">
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
                <div id="description">
                    <p>Visualization 6 - Ice core 800k year composite study CO2 measurement.<br>
                    The line graph uses data from Antarctica Vostok ice cores and extends it with<br>
                    EPICA Dome C ice core data. Extending the data to the lowest 200 meter of the Dome C <br>
                    ice core adds two new complete glacial cycles and data from 800,000 years ago. <br>
                    The graph's Y-axis shows CO2 ppmv and X-axis time.<br>
                      <br>
                     <a href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt">Data source.</a><br>
                      <br>
                     <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975">Study.</a><br>
                      <br>
                    Bereiter, B., S. Eggleston, J. Schmitt, C. Nehrbass-Ahles, T. F. Stocker, H. Fischer, S. Kipfstuhl, J. Chappellaz. 2015. Revision of the EPICA Dome C CO2 record from 800 to 600 kyr before present. Geophysical Research Letters, 42(2), 542-549. doi: 10.1002/2014GL061957
                    </p>
                  </div>
            </div> 

                   </>
        )
};

export default V6;
