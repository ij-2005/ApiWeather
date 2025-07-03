window.addEventListener('load', () => {
    document.body.style.opacity = 1;
  });

const baseURL = "https://api.weatherapi.com/v1/current.json";
const apiKey = "9f0229b7960342d1acf162530250307";

const inputBox = document.getElementById("input-box");
const inputBtn = document.getElementById("inputBtn");
const resultsContainer = document.querySelector(".results-section"); 

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

function UpdateLocation(){

    let inputLocation = inputBox.value.trim();
    

    if(inputLocation){

        inputBtn.disabled = true;
        
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputLocation}`)
        .then(response => response.json())
        .then(data => {

            if(data.error){

                alert("Invalid Location!");
                inputBox.value = "";
                resultsContainer.classList.add("error");
                cityName.textContent = "Location does not exist.";
                temperature.textContent = "Kindly input a new location.";
                description.textContent = "thank you.";
                return;

            }else{

                let errorCheck = document.querySelector(".error");
                
                if(errorCheck){
                    resultsContainer.classList.remove("error");
                }

                resultsContainer.classList.remove("hidden");
                const location = data.location.name;
                const temp = data.current.temp_c;
                const desc = data.current.condition.text;

                cityName.textContent = location;
                temperature.textContent = temp + "°C";
                description.textContent = desc;

                console.log(data); // datas
            }
            
        })
        .catch((e)=>{
            console.error("Fetch error:", e);
            alert("Something went wrong. Please try again later.");
        })
        .finally(()=>{
            inputBox.value = "";
            inputBtn.disabled = false;
        })
        ;

    }else{
        alert("Input a Location first!");
        return;
    }

}

inputBtn.addEventListener('click',()=>{
    UpdateLocation();
});
