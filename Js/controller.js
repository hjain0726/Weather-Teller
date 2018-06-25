window.addEventListener("DOMContentLoaded",start);

function start(){
    event();
}

function event(){
    document.querySelector("#btn").addEventListener("click",getdata);
}

function getdata(){
    var search=document.querySelector("#searchtxt").value;
    var url="http://api.openweathermap.org/data/2.5/weather?q="+search+"&APPID=d275263d80478a6f2dae3dccf948ffe6";
    fetch(url).then(response=>{
        console.log(response);
        response.json().then(data=>{
            console.log(data);
            show(data);
        }).catch(err=>console.log("Invalid json",err));
    }).catch(err=>console.log("Error during ajax call",err));
}

function show(result){
    document.querySelector("#add").innerHTML=" ";
    for(let key in result.main){
        create(result.main[key],key);
    }
    var cloudiness=result.weather[0].description;
    cloudy(cloudiness);
}

function create(value,key){
    var div=document.createElement("div");
    div.className="alert alert-warning";
    document.querySelector("#add").appendChild(div);
    var p=document.createElement("p");
    div.appendChild(p);
    if(key=="temp"){
        p.innerHTML="Temperature : "+ (value-273.15).toPrecision(3) + " °C ";
    }
    else if(key=="pressure"){
        p.innerHTML="Pressure : "+value+" hpa";
    }
    else if(key=="humidity"){
        p.innerHTML="Humidity : "+ value +" %";
    }
    else if(key=="temp_min"){
        p.innerHTML="Min.Temperature : "+(value-273.15).toPrecision(3) + " °C ";
    }
    else if(key=="temp_max"){
        p.innerHTML="Max. Temperature : "+(value-273.15).toPrecision(3) + " °C ";
    }

}

function cloudy(value){
    var div=document.createElement("div");
    div.className="alert alert-warning";
    document.querySelector("#add").appendChild(div);
    var p=document.createElement("p");
    div.appendChild(p);
    p.innerHTML="Cloudiness : "+value;
}
