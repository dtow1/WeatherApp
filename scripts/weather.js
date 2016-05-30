var temp;

$(document).ready(function() {
    $('#getzip').click(function(e) {
        e.preventDefault();
        useZip($('#zipcodetext').val());
    });
});

function useCoords(){ 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            var longCoord = position.coords.longitude;
            var latCoord = position.coords.latitude;
            var apiAddress= "http://api.openweathermap.org/data/2.5/weather?lat="+latCoord+"&lon="+longCoord+"&appid=";

            getdata(apiAddress);
            $("#zipcodetext").val("");
        });
    }else {
        useZip(94118);
    }
};


function useZip(zip){
    var apiAddress= "http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=";
    getdata(apiAddress);

}

function getdata(address){
    var dataresponse
   $.post("scripts/apidata.php", {addyval: address}, function (response) {

       data=jQuery.parseJSON(response);
       
       temperature=data.main.temp;
       setTemp(Math.round(KeltoFahr((temperature*10)/10)), "&deg;F");
       
       setDescription(data.weather[0].description);
       
       setLocation(data.name, data.sys.country);

       var icon = data.weather[0].icon;

       setIcon(icon);

       setBackground(icon);
   });

}

function setData(response){
    
    
};

function toggleTemp(){
    if($("#scale").html().substring(1,2)=="F"){
       setTemp(Math.round(KeltoCel((temperature*10)/10)), "&deg;C");
    }else {
       setTemp(Math.round(KeltoFahr((temperature*10)/10)), "&deg;F");
    }
}
$.getJSON('http://ipinfo.io',function(data){
    console.log(data);
})

function setTemp(temperature, scale){
    $("#temp").html(temperature);
    $("#scale").html(scale);
}

function setDescription(description){
    $("#descrip").html(description);
}

function setLocation(city, country){
    $("#location").html(city+", "+country);
}

function KeltoFahr(degreesK){
    return ((degreesK*9)/5)-459.67;
}

function KeltoCel(degreesK){
    return degreesK-273.15;
}

function setIcon(icon){
    var iconAddress= "<img src='http://openweathermap.org/img/w/"+icon+".png'>";
    $("#icon").html(iconAddress);
}

function setBackground(icon){
    /* use icon prefixes to determine what the weather is and set the appropriate background. Icon data is at: http://openweathermap.org/weather-conditions


    */

    var number = icon.substring(0,2);
    var tod=icon.substring(2,3);
    var backgroundURL = "";
    switch(number){
        case "01":
            if(tod=="n"){
                /* set background to night image*/
                backgroundURL = "images/night.jpg";

            } else {
                /*set background to day image*/
                backgroundURL = "images/sunny.jpg";

            }
            break;
        case "02":
        case "03":
        case "04":
            /*set background to cloudy image */
            if(tod=="n"){
                backgroundURL="images/nightcloudy.jpg";
            }
            backgroundURL = "images/cloudy.jpg";
            break;
        case "09":
        case "10":
            /*set background to rain image */
            if(tod=="n"){
                backgroundURL = "images/rainynight.jpg";
            }else {
                backgroundURL = "images/rainy.jpg";
            }
            break;
        case "11":
            /*set background to lightning image*/
            backgroundURL = "images/lightning.jpg";
            break;
        case "13":
            /*set background to snow image */
            backgroundURL = "images/snowing.jpg";
            break;
        case "50":
            /*set background to foggy image */
            backgroundURL = "images/foggy.jpg";
            break;
        default:
            backgroundURL = "images/sunny.jpg";
            break;
    }

    $('.allcontent').css('background-image', 'url(' + backgroundURL + ')');

}
