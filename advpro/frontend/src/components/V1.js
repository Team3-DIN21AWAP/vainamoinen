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
                  <p> Visualization 1 - Global historical surface temperature anomalies from January 1850 onwards.<br>
                      This line graph has three different toggleable dataset options for both annual and monthly scatter.<br><br><br>
                      The data is divised to Northern hemisphere, Southern hemisphere and Global (two prior combined).<br><br>
                      The graph's Y-axis shows temperature and X-axis time.<br>
                      <br>
                      Data sources:<br>
                      <br>
                      Global monthly:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.global.monthly.csv<br>
                      <br>
                      Global annual:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.global.annual.csv<br>
                      <br>
                      Northern hemisphere monthly:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.northern_hemisphere.monthly.csv<br>
                      <br>
                      Northern hemisphere annual:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.northern_hemisphere.annual.csv<br>
                      <br>
                      Southern hemisphere monthly:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.southern_hemisphere.monthly.csv<br>
                      <br>
                      Southern hemisphere annual:<br>
                      https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/analysis/diagnostics/HadCRUT.5.0.1.0.analysis.summary_series.southern_hemisphere.annual.csv<br>
                      <br>
                      Further reading and reference:<br>
                      <br>
                      Morice, C.P., J.J. Kennedy, N.A. Rayner, J.P. Winn, E. Hogan, R.E. Killick, R.J.H. Dunn, T.J. Osborn, P.D. Jones and I.R. Simpson (in press) An updated assessment of near-surface temperature change from 1850: the HadCRUT5 dataset. Journal of Geophysical Research (Atmospheres)<br> doi:10.1029/2019JD032361 (supporting information).
                      <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/HadCRUT5_accepted.pdf">https://www.metoffice.gov.uk/hadobs/hadcrut5/HadCRUT5_accepted.pdf</a><br>
                      <br>
                      Met Office Hadley Centre observations datasets<br>
                      <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">https://www.metoffice.gov.uk/hadobs/hadcrut5/</a><br>
<br><br><br>

                      Visualization 2 - Northern hemisphere 2,000-year temperature reconstruction. The visualization extends the V1 graph,<br>
                      providing a toggleable option to the line graph, which shows a reconstruction model of the temperature shift of the <br>
                      Northern hemisphere over the period of 1,979 years. The graph's Y-axis shows temperature and X-axis time.<br>
                      The data is calculated by combining low-resolution proxies with tree-ring data, using a wavelet transform technique<br>
                      to achieve timescale-dependent processing of the data.<br>
<br>
                      Further reading and reference:<br>
<br>
                      Full study:<br>
                      <a href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt">https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt</a>
<br>
                      Dataset contributors:<br>
                      Anders Moberg, Stockholm University<br>
                      IGBP PAGES/WDCA CONTRIBUTION SERIES NUMBER: 2005-019<br>
<br><br>

                      Moberg, A., et al. 2005. <br>
                      2,000-Year Northern Hemisphere Temperature Reconstruction. <br>
                      IGBP PAGES/World Data Center for Paleoclimatology <br>
                      Data Contribution Series # 2005-019.<br>
                      NOAA/NGDC Paleoclimatology Program, Boulder CO, USA.<br>
<br><br>

                      ORIGINAL REFERENCE: <br>
                      Moberg, A., D.M. Sonechkin, K. Holmgren, N.M. Datsenko and W. Karlén. 2005. <br>
                      Highly variable Northern Hemisphere temperatures reconstructed from low- <br>
                      and high-resolution proxy data.<br>
                      Nature, Vol. 433, No. 7026, pp. 613-617, 10 February 2005. <br>
<br>
                      Article:<br>
                      <a href="https://www.nature.com/articles/nature03265">https://www.nature.com/articles/nature03265</a><br>
<br>
                      Study research page:<br>
                      <a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005">https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005</a><br><br>
                      Anders Moberg, Dmitry M. Sonechkin, Karin Holmgren, Nina M. Datsenko, Wibjörn Karlén (2005) 2,000-Year Northern Hemisphere Temperature Reconstruction. IGBP PAGES/World Data Center for Paleoclimatology Data Contribution Series # 2005-019. NOAA/NGDC Paleoclimatology Program, Boulder CO, USA. <br>
                      <a href="https://www.ncdc.noaa.gov/paleo/study/6267">https://www.ncdc.noaa.gov/paleo/study/6267</a><br>
                      Moberg, A., D.M. Sonechkin, K. Holmgren, N.M. Datsenko and W. Karlén. 2005. Highly variable Northern Hemisphere temperatures reconstructed from low- and high-resolution proxy data. Nature, Vol. 433, No. 7026, pp. 613-617, 10 February 2005.<br><br>
                      </p>


                
                </div></><div></div></></>  
        )
};

export default V1
