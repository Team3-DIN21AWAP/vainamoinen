import { useState, useEffect} from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import useCookie from 'react-use-cookie';
import Moment from 'moment';
import {Icon} from "react-3d-icons";
import {kuma} from "react-3d-icons";
import Chart, { Ticks } from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import "./index.css";

const V8 = () => {
   
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
        xAxisKey: "",
        yAxisKey: "",
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

  const V8Data = require("./V8.json");
  console.log(V8Data);
  
              
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

        var converted  = false;

    useEffect(() => {
         refreshToken();
         getUsers(); 
         var setData = { datasets: []};
         if(!converted) {
          for(var i = 0; i < V8Data.length; i++) {
            var o = V8Data[i];
            var oldyear = o["year"];
            o["year"] = new Date(oldyear+'-01-01T00:00:00');
          }
          converted = true;
        }
        const obj = V8Data[0];
        var R = 0;
        var RV = R;
        for(var k in obj ){
            if(k === "year") continue;
            else{
              for(var i = 0; i < V8Data.length; i++) {
                var o = V8Data[i];
                var oldvalue = o[k];
                o[k] = oldvalue * 3.664;
              }
              R += 5;
              RV = R%255;
                setData.datasets.push(
                    {
                        label: k,
                        data: V8Data,
                        parsing: {
                            xAxisKey: "year",
                            yAxisKey: k,	
                        },
                        borderColor: 'rgb('+RV.toString()+', 99, 132)',
                        backgroundColor: 'rgba('+RV.toString()+', 99, 132, 0.5)',
                        pointRadius: 0.1,
                    });
                    
            }
        }
        setChart(setData);
    }, []);
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "CO2 emissions by country"
        },
      },
      scales: {
        x: {
          type: "timeseries"
          },
        yAxis: {
          type: "linear"
        },
      },
    };

  
        return (
            <>
            <div >
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
            </div> 
                   </>
        )
};

export default V8;
