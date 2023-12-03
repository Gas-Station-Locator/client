import { useState, useEffect } from "react";

let defaultCenter = { lat: 34.1318686, lng: -117.9255449 };

const URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${defaultCenter.lat}&lon=${defaultCenter.lng}&radius=10000&categorySet=7311&view=Unified&relatedPois=off&key=7hlM2qXNaJMQyZLYbmYOsyz2zB3QkWi9`;

//1:cf81fe50-6218-11ea-a677-d05099d5f839

const Tom = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setData(data.results);
        console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div className="Tom">
      <ul style={{ listStyle: "none" }}>
        {data.map((item) => {
          return (
            <li key={item.id}>
              Address: {item.address.streetNumber} {item.address.streetName},
              {item.address.municipality}, {item.address.countrySubdivision}{" "}
              {item.address.postalCode} --- Name: {item.poi.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tom;
