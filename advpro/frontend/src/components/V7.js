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



  
const V7 = () => {
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
    const GAST = await axiosJWT.get('http://localhost:5000/v71',{ 
       headers: {
                  Authorization: `Bearer ${token}`
                }
    });

    const CO2 = await axiosJWT.get('http://localhost:5000/v72',{ 
      headers: {
                  Authorization: `Bearer ${token}`
                }
    });
    console.log(CO2);

    const data = {
        datasets: [
                    {
                      label: 'GAST',
                      yAxisID: 'y',
                      data: GAST.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "temp",
                      },
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      
                    },
                    {
                      label: 'CO2',
                      yAxisID: 'y1',
                      data: CO2.data,
                      parsing: {
                        xAxisKey: "time",
                        yAxisKey: "co2",
                      },
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
         getGlobalAnnualData();
    }, []);
    const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "GAST and CO2"
          },
        },
        scales: {
          x: {
            type: "linear"
            },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
            }
        
    };

  
        return (
            <>
            {/*<video autoPlay muted loop id="background">
            <source src={bgVideo} type="video/mp4"></source>
        </video>*/}
            <div>
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
                      <p>Visualization 7 - Evolution of global temperature over the past two million years. The multiaxis line graph uses data from Change in <br>
                        Global Average Surface Temperature (GAST) 50% credible interval and atmospheric CO2 levels. The graph's left Y-axis shows temperature change, <br>
                        X-axis represents time and the right Y2-axis show CO2 level.<br>
<br>
                        Publication letter:<br>
                        https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf<br>
<br>
                        Data source:<br>
                        http://carolynsnyder.com/publications.php on that page http://carolynsnyder.com/papers/Snyder_Data_Figures.zip which is found under "Source data for Figures".<br>
<br>
<br>
                        Snyder, C. Evolution of global temperature over the past two million years. Nature 538, 226–228 (2016). https://doi.org/10.1038/nature19798<br>
                  <br>
                      </p>
                  </div>
            </div> 
                   </>
        )
};

export default V7
