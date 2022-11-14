import { useState, useEffect} from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import useCookie from 'react-use-cookie';
import Moment from 'moment';
import {Icon} from "react-3d-icons";
import {kuma} from "react-3d-icons";
import Select from "react-dropdown-select";

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
    const [series, setSeries] = useState([]);
    const [chartData, setChart] = useState({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
          },
        ],
      });
     /* const [chart2Data, setChart2] = useState({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
          },
        ],
      });
      const [chart3Data, setChart3] = useState({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
          },
        ],
      });
      const [chart5Data, setChart5] = useState({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
          },
        ],
      });
      const [chart6Data, setChart6] = useState({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            borderColor: '',
            backgroundColor: '',
          },
        ],
      });*/
    
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
            Moment.locale('en');
            for (let  i= 0; i < series.length; i++) {
              const element = series[i].id;
              console.log(element);
            }
                const response = await axiosJWT.get('http://localhost:5000/v1ga',{ 
                  headers: {
                  Authorization: `Bearer ${token}`
                  }
                });
                var labarr = [];
                var valarr = [];
                var labGM = [];
                var valGM = [];
  
                for( var x=0; x<response.data.length; ++x){
                    labarr.push(response.data[x].time);
                    valarr.push(response.data[x].anomalyC);
                }
              const monthly = await axiosJWT.get('http://localhost:5000/v1gm',{ 
                  headers: {
                  Authorization: `Bearer ${token}`
                  }
              });
          
          
              for(x=0; x<monthly.data.length; ++x){
                  labGM.push(Moment(monthly.data[x].time).format('YYYY'));
                  valGM.push(monthly.data[x].anomalyC);
              }
              
            
              var chartDatat = {
                  labels: labGM,
                  datasets: [
                    {
                      label: 'Annual',
                      data: labarr.map( (value, index) => valarr[index] ),
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                 
                    {
                      label: 'Monthly',
                      data: labGM.map( (value, index) => valGM[index] ),
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                  ],
                };
              setChart(chartDatat);
        }
              
          
/*
          const getNorthAnnualData = async () => {
              Moment.locale('en');
              const response = await axiosJWT.get('http://localhost:5000/v1na',{ 
                  headers: {
                  Authorization: `Bearer ${token}`
                  }
              });
              var labarr = [];
              var valarr = [];
      
  
              for( var x=0; x<response.data.length; ++x){
                  labarr.push(Moment (response.data[x].time).format('YYYY'));
                  valarr.push(response.data[x].anomalyC);
              } 
            
            
            }
           
            var chartDatat = {
                labels: labarr,
                datasets: [
                  {
                    label: 'Annual',
                    data: labarr.map( (value, index) => valarr[index] ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };*/
          /*  setChart2(chartDatat);
            
        }
        const getNorthMonthlylData = async () => {
            Moment.locale('en');
            const response = await axiosJWT.get('http://localhost:5000/v1nm',{ 
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            var labarr = [];
            var valarr = [];
    

            for( var x=0; x<response.data.length; ++x){
                labarr.push(Moment (response.data[x].time).format('YYYY'));
                valarr.push(response.data[x].anomalyC);
            }
           
            var chartDatat = {
                labels: labarr,
                datasets: [
                  {
                    label: 'Annual',
                    data: labarr.map( (value, index) => valarr[index] ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };
            setChart3(chartDatat);
            
        }
        const getSouthAnnualData = async () => {
            Moment.locale('en');
            const response = await axiosJWT.get('http://localhost:5000/v1sm',{ 
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            var labarr = [];
            var valarr = [];
    

            for( var x=0; x<response.data.length; ++x){
                labarr.push(Moment (response.data[x].time).format('YYYY'));
                valarr.push(response.data[x].anomalyC);
            }
           
            var chartDatat = {
                labels: labarr,
                datasets: [
                  {
                    label: 'Annual',
                    data: labarr.map( (value, index) => valarr[index] ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };
            setChart5(chartDatat);
        
        }
        const getSouthMonthlylData = async () => {
            Moment.locale('en');
            const response = await axiosJWT.get('http://localhost:5000/v1sm',{ 
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            var labarr = [];
            var valarr = [];
    

            for( var x=0; x<response.data.length; ++x){
                labarr.push(Moment (response.data[x].time).format('YYYY'));
                valarr.push(response.data[x].anomalyC);
            }
           
            var chartDatat = {
                labels: labarr,
                datasets: [
                  {
                    label: 'Annual',
                    data: labarr.map( (value, index) => valarr[index] ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              };
            setChart6(chartDatat);
        
        }*/

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
         console.log(series);
         //getNorthAnnualData();
         //getNorthMonthlylData();
        // getSouthMonthlylData();
        // getSouthAnnualData();
    }, []);

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
            <Select
              multi
              options={[{
                  "id": "1",
                  "series": "Global (NH+SH)/2",
                },
                {
                  "id": "2",
                  "series": "Northern hemisphere"
                },
                {
                  "id": "3",
                  "series": "Southern hemisphere"
                }]}
              valueField="id"
              labelField="series"
              values={[]}
              onChange={(value) =>
                {setSeries(value); getGlobalAnnualData();}
      }
    />
                <Line options={options} data={chartData} />
                <div>
                     {/*<Line options={options} data={chart2Data} />
                   <Line options={options} data={chart3Data} />
                    <Line options={options} data={chart5Data} />
                     <Line options={options} data={chart6Data} />*/}
                </div></><div></div></></>  
        )
};

export default V1
