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
        
    const URL = `https://localhost:4000/getStations/`;

    const [stations, setStations] = useState([]);
    // async function downloadPrice(index) {
    //     const commentsURL = getstations/results;
    //     const response = await fetch(commentsURL);
    //     const comments = await resasyncponse.json();
    //     return comments;
    // }

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/getStations');
        const data = await response.json();

        setStations(data[0].results);
        // console.log(data[0].results[0]);
      };
      fetchData();
    }, []);

    return (
        <div>
            <p>hi
            {
                stations.map((station) => {
                    <h1>
                        {console.log(station.title)}
                        {station.gasPrices}
                        {station.address}
                    </h1>
                })
            }
            </p>
        </div>
    )
}

export default App;