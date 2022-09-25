import axios from "axios";
import states from "../utils/states.js";

const instances = {};

const weather = new Proxy(instances, {
    get(_, state, receiver) {
        const coords = states[state];

        return receiver[state] = axios.create({
            baseURL: `https://atlas.microsoft.com/weather/historical/actuals/daily/json?api-version=1.1&query=${coords.lat},${coords.lng}`,
            method: 'get',
        });
    }
});

export default weather;
