import { dadosGov, weather } from './services/index.js';
import { getMonthRange } from './utils/getMonth.js';

export default async function api(req, res) {
    const { month, state, year } = req.query;

    let results = {
        gov: 0,
        weather: 0
    };

    const range = getMonthRange(Number(month), Number(year));

    // Instâncias do Axios
    const getGov = dadosGov[state];
    const getWeather = weather[state];

    try {
        const { count } = (await getGov({
            data: {
                "query": {
                    "range": {
                    "dataNotificacao": {
                            "gte": range.start,
                            "lt": range.end
                        }
                    }
                }
            }
        })).data;

        // número de casos gripais no mês
        results.gov = count;

        const weatherData = (await getWeather({
            params: {
                'subscription-key': 'E8rGBUmN-PioVxgUx9m0n-BCNaoAbVpGSdnOlCyAUDM',
                'startDate': range.start,
                'endDate': range.end
            }
        })).data;

        // Média da amplitude térmica
        results.weather = weatherData.results.reduce((amplitude, { temperature }) => {
            return amplitude += (temperature.maximum.value - temperature.minimum.value);
        }, 0)/weatherData.results.length;
    } catch (err) {
        console.log(err);

        res.status(500).json({
            results,
        });
    }

    res.status(200).json({
        results,
    });
};
