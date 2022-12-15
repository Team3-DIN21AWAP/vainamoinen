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
                   <div>
                        <p>Visualization 8 - CO2 emissions by country. A stacked line graph showing the CO2 emissions<br>
                        divided territorially by countries. The graph's Y-axis shows millions of tonnes of CO2 and X-axis<br>
                        time.<br>
<br>
                        Research article:<br>
                        <a href="https://essd.copernicus.org/articles/14/1917/2022/">https://essd.copernicus.org/articles/14/1917/2022/</a><br>
<br>
                        Data source:<br>
                        <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D">https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D</a><br>
<br>
<br>
                        Friedlingstein, P., Jones, M. W., O'Sullivan, M., Andrew, R. M., Bakker, D. C. E., Hauck, J., Le Quéré, C., Peters, G. P., Peters, W., Pongratz, J., Sitch, S., Canadell, J. G., Ciais, P., Jackson, R. B., Alin, S. R., Anthoni, P., Bates, N. R., Becker, M., Bellouin, N., Bopp, L., Chau, T. T. T., Chevallier, F., Chini, L. P., Cronin, M., Currie, K. I., Decharme, B., Djeutchouang, L. M., Dou, X., Evans, W., Feely, R. A., Feng, L., Gasser, T., Gilfillan, D., Gkritzalis, T., Grassi, G., Gregor, L., Gruber, N., Gürses, Ö., Harris, I., Houghton, R. A., Hurtt, G. C., Iida, Y., Ilyina, T., Luijkx, I. T., Jain, A., Jones, S. D., Kato, E., Kennedy, D., Klein Goldewijk, K., Knauer, J., Korsbakken, J. I., Körtzinger, A., Landschützer, P., Lauvset, S. K., Lefèvre, N., Lienert, S., Liu, J., Marland, G., McGuire, P. C., Melton, J. R., Munro, D. R., Nabel, J. E. M. S., Nakaoka, S.-I., Niwa, Y., Ono, T., Pierrot, D., Poulter, B., Rehder, G., Resplandy, L., Robertson, E., Rödenbeck, C., Rosan, T. M., Schwinger, J., Schwingshackl, C., Séférian, R., Sutton, A. J., Sweeney, C., Tanhua, T., Tans, P. P., Tian, H., Tilbrook, B., Tubiello, F., van der Werf, G. R., Vuichard, N., Wada, C., Wanninkhof, R., Watson, A. J., Willis, D., Wiltshire, A. J., Yuan, W., Yue, C., Yue, X., Zaehle, S., and Zeng, J.: Global Carbon Budget 2021, Earth Syst. Sci. Data, 14, 1917–2005, https://doi.org/10.5194/essd-14-1917-2022, 2022.<br>
<br>

                        </p>
                   </div>
            </div> 
                   </>
        )
};

export default V8;
