import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const [stations, setStations] = useState([])
  // useEffect(()=> {
  //     axios.get('https://localhost:5000/getStations')
  //     .then(stations => setStations(stations.data))
  //     .catch(err => console.log(err))
  // }, [])

  // return(

  const URL = `https://localhost:4000/getStations`;

  const [stations, setStations] = useState([]);
  const [gasPrices, setGasPrices] = useState([]);

  // async function downloadPrice(index) {
  //   const commentsURL = getstations / results;
  //   const response = await fetch(commentsURL);
  //   const comments = await resasyncponse.json();
  //   return comments;
  // }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/getStations");
      const data = await response.json();

      setStations(data[0].results);
      setGasPrices(data[0].results.gasPrices);
      // console.log(data[0].results[1].gasPrices[0].priceTag);
      console.log(data[0].results[1]);
      console.log(data[0]);
    };
    fetchData();
  }, []);



  return (
    <div>
      <ul style={{ listStyle: "none"} }>
        {stations.map((item) => {
          return (
            <li key={item.id}>
              Address: {item.address} ---
              Gas Price: {item.gasPrices.priceTag}
              {console.log(item.gasPrices.priceTag)}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
