$(document).ready(function() {
  var d = new Date();
  d = d.toDateString();
  document.getElementById("date").innerHTML = d;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var link = "https://api.darksky.net/forecast/63b57e036b0785ab14a587ef2eae8db7/" + position.coords.latitude + "," + position.coords.longitude;
    var script = $("<script />", {
    src: link,
    type: "application/json"
  }
);
  $("head").append(script); 
      $.ajax({
        url: link,
        dataType: "jsonp",
      });
      $.getJSON("https://api.apixu.com/v1/current.json?key=6ceb688f66a14438865211006170806&q=auto:ip", function(loc) {
        if (loc.location.region.length>0) {
        document.getElementById("location").innerHTML = loc.location.name + ", " + loc.location.region;
        }
        else {
          document.getElementById("location").innerHTML = loc.location.name + ", " + loc.location.country;
        }
      });
      $.getJSON(link + "?exclude=[minutely,hourly,alerts,flags]&units=si&callback=?",function(json){
        var color = "#000";      document.getElementById("summary").innerHTML = json.currently.summary;
        var skycons = new Skycons({"color": color});
        skycons.set("weatherIcon", json.currently.icon);
        skycons.play();
        document.getElementById("temperature").innerHTML = Math.round(json.currently.temperature);
        document.getElementById("feelsLike").innerHTML = "Feels Like " + Math.round(json.currently.apparentTemperature) + "<i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C";
        document.getElementById("maxmin").innerHTML = "Max: " + json.daily.data[0].temperatureMax + " <i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C<br>Min: " + json.daily.data[0].temperatureMin + " <i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C";
        document.getElementById("precepitation").innerHTML = "Precepitation: " + json.currently.precipIntensity + " mm";
        document.getElementById("wind").innerHTML = "Wind Speed: " + json.currently.windSpeed + " km/h";
      document.getElementById("humidity").innerHTML = "Humidity: " + json.currently.humidity*100 + "%";
        function useC() {
          document.getElementById("temperature").innerHTML = Math.round(json.currently.temperature);
          document.getElementById("unit").innerHTML = "C";
          document.getElementById("feelsLike").innerHTML = "Feels Like " + Math.round(json.currently.apparentTemperature) + "<i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C";
          document.getElementById("maxmin").innerHTML = "Max: " + json.daily.data[0].temperatureMax + "<i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C<br>Min: " + json.daily.data[0].temperatureMin + "<i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>C";
        }
        document.getElementById("useC").onclick = function() {useC()};
        function useF() {
          var tempF = json.currently.temperature * 1.8 + 32;
          document.getElementById("temperature").innerHTML = Math.round(tempF);
          document.getElementById("unit").innerHTML = "F";
          document.getElementById("feelsLike").innerHTML = "Feels Like " + Math.round(json.currently.apparentTemperature*1.8 + 32) + "<i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>F";
          document.getElementById("maxmin").innerHTML = "Max: " + (json.daily.data[0].temperatureMax*1.8+32).toFixed(2) + " <i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>F<br>Min: " + (json.daily.data[0].temperatureMin-1.8+32).toFixed(2) + " <i class='wi wi-degrees' aria-hidden='true' style='font-size: 1.4em;vertical-align: -5px;'></i>F";
        }
        document.getElementById("useF").onclick = function() {useF()};
});
    });
  };
});