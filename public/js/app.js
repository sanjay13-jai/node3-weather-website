const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          return (messageOne.textContent = data.error);
        }
        messageOne.textContent = data.location;
        const { description, feelslike, humidity, temperature, wind_speed } =
          data.forecase;
        messageTwo.textContent = `Description: ${description},Feels Like: ${feelslike}°C, Humidity: ${humidity}%, Temperature: ${temperature}°C, Wind Speed: ${wind_speed} km/h`;
      });
    })
    .catch((error) => {
      console.log("Unable to connect to weather service!");
    })
    .finally(() => {
      console.log("Fetch request completed.");
    });
});
