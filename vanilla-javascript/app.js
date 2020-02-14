window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a32a1cebb6060feabe02f1c1a9b44641`;
            

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {icon, description} = data.weather[0];
                const {name} = data
                temperatureDegree.textContent = Math.floor((temp - 273) * (9/5) + 32);
                locationTimeZone.textContent = name;
                temperatureDescription.textContent = description
                setIcons(icon);
            });
        });
    }

    function setIcons(icon) {
        document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
});