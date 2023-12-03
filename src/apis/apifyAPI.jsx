import { useState, useEffect } from "react";
// import {ApifyClient} from 'apify-client';

const { ApifyClient } = require("apify-client");

const client = new ApifyClient({
  token: "apify_api_ZmDftIecMV7ZLwRuJg8969bGwuva981qVFXx",
});

const input = {
  location: "Cal Poly Pomona, West Temple Avenue, Pomona, CA",
  maxCrawledPlacesPerSearch: 1,
};

const { defaultDatasetId } = await client
  .actor("natasha.lekh/gas-prices-scraper")
  .call(input);

const { items } = await client.dataset(defaultDatasetId).listItems();

function Apify() {
  console.log("Results:");
  items.forEach((item) => {
    console.log(item);
  });
}

export default Apify;
