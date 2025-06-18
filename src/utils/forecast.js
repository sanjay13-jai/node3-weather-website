const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=48f744b4680b59e546dfcd70012dff40&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    const { current } = body;
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        description: current.weather_descriptions[0],
        temperature: current.temperature,
        feelslike: current.feelslike,
        humidity: current.humidity,
        wind_speed: current.wind_speed,
      });
    }
  });
};

module.exports = forecast;
