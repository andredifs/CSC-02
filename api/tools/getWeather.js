import { weather } from "../services/index.js";
import { getMonthRange } from "../utils/getMonthRange.js";

export async function getWeatherData(state, month, year) {
    const getWeather = weather[state];

    const range = getMonthRange(month, year);

    console.log(range);

    const result = (await getWeather({
        params: {
            'subscription-key': 'E8rGBUmN-PioVxgUx9m0n-BCNaoAbVpGSdnOlCyAUDM',
            'startDate': range.start,
            'endDate': range.end
        }
    })).data;

    return result;
}
