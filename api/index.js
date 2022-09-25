import express from 'express';
import cors from 'cors';
import { dadosGov, weather } from './services/index.js';
import { getMonthRange } from './utils/getMonth.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
    const { state, month, year } = req.query;

    let results = {
        gov: 0,
        weather: 0
    };

    const range = getMonthRange(Number(month), Number(year));

    const getGov = dadosGov[state];

    results.gov = (await getGov({
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
    })).data.count;

    const getWeather = weather[state];

    const weatherData = (await getWeather({
        params: {
            'subscription-key': 'E8rGBUmN-PioVxgUx9m0n-BCNaoAbVpGSdnOlCyAUDM',
            'startDate': range.start,
            'endDate': range.end
        }
    })).data;

    results.weather = weatherData.results.reduce((amplitude, { temperature }) => {
        return amplitude += (temperature.maximum.value - temperature.minimum.value);
    }, 0)/weatherData.results.length;

    console.log(results);

    res.status(200).json({
        results,
    });
});

app.listen(3000, () => { console.log('Server running on port 3000') });

export default app;
