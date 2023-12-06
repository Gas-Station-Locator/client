import { useEffect, useState } from "react";
import axios from 'axios';

function App(){
    // const [stations, setStations] = useState([])
    // useEffect(()=> {
    //     axios.get('https://localhost:5000/getStations')
    //     .then(stations => setStations(stations.data))
    //     .catch(err => console.log(err))
    // }, [])

    // return(
        
    const URL = `https://localhost:4000/getStations`;

    const [stations, setStations] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/getStations');
        const data = await response.json();

        setStations(data.results);
        console.log(data);
      };
      fetchData();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stations.map((station) => {
                            <tr>
                                <td>{station.name}</td>
                                <td>{station.address}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default App;