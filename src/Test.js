import { useEffect, useState } from "react";
import axios from "axios";


function App() {


  const URL = `https://localhost:4000/getStations`;

  const [stations, setStations] = useState([]);
  const [stationsArr, setStationsArr] = useState([])
  const address1 = "3502 National Ave, San Diego, CA 92113, United States";




  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/getStations");
      const data = await response.json();

      setStations(data[0].results);
    };
    fetchData();
  }, []);

  let stationAddress = [];
  let stationPrices = [];
  const arrayOfNamesAndPrices = [];

  console.log(stationAddress)
  stations.map((item)=>{
    stationAddress.push([item.address])
  })
  stations.map((item)=>{
    stationPrices.push([item.gasPrices[0].priceTag])
  })

  for(let i=0; i<stationAddress.length; i++) {
    arrayOfNamesAndPrices[i] = { address: stationAddress[i][0], price: stationPrices[i][0]};
  }
  console.log(arrayOfNamesAndPrices);


  let isEqual = false;

  for (let i = 0; i < stationAddress.length; i++) {
    if (stationAddress[i][0] === address1) {
        isEqual = true;

        break; // Breaks out of the loop when a match is found
    }
  }
  return (
    <div>
      <ul style={{ listStyle: "none"} }>
        {stations.map((item) => {
          return (
            <li key={item.id}>
              Address: {item.address} ---
              Gas Price Regular: {item.gasPrices[0].priceTag}
              {/* {console.log(stationAddress)}; */}
              {/* {console.log(item.gasPrices[0])}
              {console.log(item)} */}
            </li>
          )
        })}

      </ul>
    </div>
  );
}

export default App;
