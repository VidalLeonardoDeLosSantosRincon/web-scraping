import http  from "http";
import cheerio from 'cheerio'; 
import pretty from "pretty";
import {getContries} from './getContries.js';
const port = process.env.PORT || 1801;

const server = http.createServer( async (req, res)=>{
    let data = await getContries();
    let $ = cheerio.load(data);
    const listItems = $(".plainlist ul li");
    let countries = [];
    
    listItems.each((idx, el) => {
      const country = { name: "", iso3: "" };
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      countries.push(country);
    });

    countries = JSON.stringify({numRows: countries.length, countries});
    res.writeHead(200, {"Content-type" :"application/json"});
    res.write(countries);
    res.end();
});

server.listen(port, () =>{
    console.log(`Server runnig on port: ${port}`);
});