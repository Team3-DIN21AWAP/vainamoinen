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



  
const V5 = () => {
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
    const V5 = await axiosJWT.get('http://localhost:5000/v5',{ 
       headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    console.log(V5)     
          
    const data = {
        datasets: [
                    {
                      label: 'CO2 concentration',
                      data: V5.data,
                      parsing: {
                        xAxisKey: "ageofair",
                        yAxisKey: "CO2concentration",
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
          text: "HadCRUT5"
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
                  <div>
                      <p>Visualization 5 - Vostok Ice Core CO2 measurements, 417160 - 2342 years. The line graph displays the annual CO2 data of ice core samples.<br>
                      The derived samples were obtained at Vostok, East Antarctica, reaching a depth of 3,623 meters. The graph's Y-axis shows CO2 ppm and X-axis<br>
                      time. The data indicates four different climate cycles.<br>
<br>
                      Data source:<br>
                      <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2">https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2</a><br>
<br>
                      Research and method information:<br>
                      <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html">https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html</a><br>
<br>
                      Barnola, J.-M., D. Raynaud, C. Lorius, and N.I. Barkov. 2003. Historical CO2 record from the Vostok ice core. In Trends: A Compendium of Data on Global Change. Carbon Dioxide Information Analysis Center, Oak Ridge National Laboratory, U.S. Department of Energy, Oak Ridge, Tenn., U.S.A.<br>
<br>
                      </p>
                  </div>
            </div> 
                   </>
        )
};

export default V5;
