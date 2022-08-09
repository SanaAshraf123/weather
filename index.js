const http =require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile=fs.readFileSync("index.html","utf-8");


const replaceVal = (tempVal,origVal)=>{
    let temperature=tempVal.replace("{%tempval%}",origVal.main.temp);
    temperature=temperature.replace("{%tempmin%}",origVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",origVal.main.temp_max);
    temperature=temperature.replace("{%Location%}",origVal.name);
    temperature=temperature.replace("{%country%}",origVal.sys.country);
    temperature=temperature.replace("{%tempstatus%}",origVal.weather[0].main);
    return temperature;
}
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=4d02548aefcf008587e6eaa0fad8ee78")

    .on("data",(chunk)=>{
        const objData=JSON.parse(chunk);
        const arrData=[objData];
    // console.log(arrData[0].main.temp);
        const realTimeData=arrData.map((val)=> replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);
        })
       
    
     .on("end",(err)=>{
        if(err) return console.log("connection closed due to an error",err);
        // console.log("end");
        res.end();
    });
    }
    });


server.listen(8000,"127.0.0.1");