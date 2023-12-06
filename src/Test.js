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
        
    const URL = `https://localhost:4000/getStations/results`;

    const [stations, setStations] = useState([]);
    async function downloadPrice(index) {
        const commentsURL = getstations/results;
        const response = await fetch(commentsURL);
        const comments = await resasyncponse.json();
        return comments;
    }

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/getStations');
        const data = await response.json();

        setStations(data);
        // console.log(data[0].results[0]);
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
                                {console.log(station)}
                                <td>{station[0]}</td>
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