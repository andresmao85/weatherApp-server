# Weather Forecast App

This is a weather forecast application built using Express.js and Axios. The app retrieves weather data from the WeatherAPI and serves it to the frontend. The data includes current weather, daily forecasts, and hourly forecasts for a given location.

## Features

- Provides current weather conditions
- Delivers daily weather forecasts for the next 7 days
- Offers hourly weather forecasts for the next 24 hours
- Built with Express.js for server-side functionality
- Utilizes Axios for making HTTP requests
- CORS enabled for cross-origin resource sharing

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/weather-forecast-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd weather-forecast-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of your project.
2. Add your WeatherAPI key to the `.env` file:
    ```plaintext
    WEATHER_API_KEY=your_api_key_here
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. The server will run on the port specified in the `.env` file or default to port 8000.

## API Endpoints

### GET /weather

Retrieve weather information based on latitude and longitude.

#### Query Parameters:
- `lat` (required): Latitude of the location
- `lon` (required): Longitude of the location

#### Example Request:
```bash
curl "http://localhost:8000/weather?lat=35.6895&lon=139.6917"
