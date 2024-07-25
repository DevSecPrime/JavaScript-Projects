// fetching all the custom Elements/.......

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");//class

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");//class
const userInfoContainer = document.querySelector(".user-info-container");//class


// intitially varibales Need////

// here currentTab is default tab which is your weather...

let currentTab = userTab;
const API_KEY = "8a5ff78c17fbf1881908f7f43197857d";
currentTab.classList.add("current-tab")

// to show data --> cliking--- grant access-
getFromSessionStorage();


// what is currentTab & newTab :-

// exp :- now you are on "A" ladder-(sidi) so this is your currentTab
// and you have to go on "B" ladder-(sidi) so this is your newTab------
// and then you are switching the table from currentTab(A) to newTab (B)----
// so ,now B is yor currentTab and A is your newTab ------- your currentTab and newTab would be switching basedon your click or need


// apne khbr kaeee rite pdse k apne switch krvnu chhe ... kya to "your weather" pr click karyu hse ya to search weather pr click kryu hse ....ena mmate banne tab pr click event pr ek evetListener or onlclick() evenet use kryu hse j ....switch krse ...and e event ne handle krva ek function banvyu hse j exp switchWeatherTab()---j tab ne switch krse


// for switch the tab----

const switchTab = (clickedTab) => {

    //jo click karelu tab e current tab naa hoi to etle k...
    //if(clickedTab != currentTab)-----> to aapnre nava tab pr javnu

    //jo click karelu tab e current tab  hoi to etle k...
    //if(clickedTab = currentTab)-----> to aapnre nava tab pr javnu nthi

    if (clickedTab != currentTab) {

        // here;
        // currentTab ---> oldTab &
        // clickedTab ----> newTab.......

        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");


        //staring ma apne search walu tab invisible chhe etle k dekhatu nthi.. to..e search tab ne vible krvnu and baki na bdha tab ne invisible krvana etle k....grantAccessContainer and userInfocontainer ne invible--etle ni dekhva joieee---krvanu......and searchForm ne visible krvnu etle k dekhavu joiee...

        //Here,  ek condition lagaviye...jo ......searchForm tab visible naa hoi ....dekhatu naaa hoi invisible hoi ......to ene visible kari do or... dekhay evu kri do.....and baki na tab invisible kari do.....

        // etle k ....serchForm ma active class addd naaaaa hoi to ene....add kri do ene visible krva maate......

        //etle k.....if(!searchForm.classList.contains("active"))----> means :---
        //searchForm active nathi ...rkhto to ene active kri do...jethi e dekhava lage.....etle k ena pse active class nathi t5o ene aapi do ....contain nathi krtu to contain karavo.....

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //apne pahela Search weather tab pr hat pn have apne Your weather pr chhie....to tyre krvnu ....
            // to k bhaai....searchForm---> je search tab maa che j active chhe ene hid krei de....dekhatu bndh kari de....

            //and user-info-Container ne pn invisible kri de......

            //and....j pn apnu weather chhe ene visible kari de....j eni jate male chhe cordinates dvraa ....APIs dwara---->j cordinate session n alocal storgae ma save che......

            //function use krisu----getFromSessionStorage()
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage(); //calling the function to show the weather information

        }
    }

}

userTab.addEventListener("click", () => {

    //we are the passing the tab that we had clicked---
    //j tab pr click kryu chhe e tab passs kari , sema?---to k switchTab() function ma
    //userTab pr click kryu to switchTab() function ma userTab passs kari -->switchTab(userTab)

    switchTab(userTab);
})

searchTab.addEventListener("click", () => {

    //Aj rite , searchTab pr click kryu to searchTab pass kryu ,,,,kyaaa?---> to k function ma,,,,Kaee rite ? ......to k aa rite -----> switchTab(searchTab)
    switchTab(searchTab);
})

// basically , apne j pn tab pr click krisu e tab pr jata resu ....A tab pr clk to A and B to


//ro show the wether info to user from localstorage ---->

function getFromSessionStorage() {
    //hamne hamare localstorage k ande session storage k ander user-coordinates store kiye hoge agar woh hai to dedo

    const localCoordinates = sessionStorage.getItem("user-coordinates");
    //getItem () --> used to fetch co-ordinates form user-co-ordeinates from sessionStorge

    if (!localCoordinates) {
        //jo localCoordinates available nathi .....etle k store nthi...save nathi to 
        // grantAccessContainer ne visible kri de---->

        grantAccessContainer.classList.add("active");
    }

    else {
        //availabe chee---->to latitude longitude use karne APIs call karo..
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);

        //fetchUserWeatherInfo(coordinates); ---> calll karyu coordinates na base pr user na weather data fetch karvana.........

    }

}

async function fetchUserWeatherInfo(coordinates) {
    let { lat, lon } = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        console.log(err);

    }

}

function renderWeatherInfo(weatherInfo) {
    const cityNameElement = document.querySelector("[data-cityName]");
    const countryIconElement = document.querySelector("[data-countryIcon]");
    const descElement = document.querySelector("[data-weatherDesc]");
    const weatherIconElement = document.querySelector("[data-weatherIcon]");
    const tempElement = document.querySelector("[data-temp]");
    const windspeedElement = document.querySelector("[data-windspeed]");
    const humidityElement = document.querySelector("[data-humidity]");
    const cloudinessElement = document.querySelector("[data-cloudiness]");

    // Check if elements are found before setting innerText
    if (cityNameElement) cityNameElement.innerText = weatherInfo?.name;
    if (countryIconElement) countryIconElement.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    if (descElement) descElement.innerText = weatherInfo?.weather?.[0]?.description;
    if (weatherIconElement) weatherIconElement.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    if (tempElement) tempElement.innerText = `${weatherInfo?.main?.temp} °C`;
    if (windspeedElement) windspeedElement.innerText = `${weatherInfo?.wind?.speed} m/s`;
    if (humidityElement) humidityElement.innerText = `${weatherInfo?.main?.humidity}%`;
    if (cloudinessElement) cloudinessElement.innerText = `${weatherInfo?.clouds?.all}%`;
}


//jevu grant access pr click kru eva lat and lon find thy and sessonStorage ma store thy jay...
//to apne grantAccess pr ek listener lagavu padse.......

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("No support for geolocation");
        console.log("error");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", () => {

    getLocation();

    // Move the call to getLocation inside the click event listener
    // grantLocationContainer.classList.toggle("active");
    // Additional logic or actions related to the "Grant Access" button click
    // ...

});

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));//save coordinates in session---> storage

    // Hide grant access container
    grantAccessContainer.classList.remove("active");

    //show data in UI
    fetchUserWeatherInfo(userCoordinates);
}

// for searh the city or other city weather==

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let cityName = searchInput.value;

    if (cityName === "") {
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
    }

})

async function fetchSearchWeatherInfo(city) {
    // active loader-
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    } catch (e) {
        loadingScreen.classList.remove("active");
        console.log(e);
    }
}