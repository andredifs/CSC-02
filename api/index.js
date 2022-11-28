import { getGovData } from './tools/getGov.js';
import { getWeatherData } from './tools/getWeather.js';
import { getMonthRange } from './utils/getMonthRange.js';
import { Router } from 'express';
import {
    perMonthValidator,
    perYearValidator,
    perSeasonValidator
} from './validators/query.js';

const api = Router();

api.get('/data-per-month', async (req, res) => {
    const { state, month, year } = req.query;

    if (!perMonthValidator(req.query)) {
        return res.status(400).json({
            error: 'Invalid query'
        });
    }

    let results = {
        gov: 0,
        weather: 0
    };

    try {
        const { start, end } = getMonthRange(Number(month), Number(year));

        results.gov = await getGovData(state, start, end);

        const weatherData = await getWeatherData(state, Number(month), Number(year));

        // Média da amplitude térmica
        results.weather = weatherData.results.reduce((amplitude, { temperature }) => {
            return amplitude += (temperature.maximum.value - temperature.minimum.value);
        }, 0)/weatherData.results.length;
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            results,
        });
    }

    return res.status(200).json({
        results,
    });
});

api.get('/data-per-year', async (req, res) => {
    const { state, year } = req.query;

    if (!perYearValidator(req.query)) {
        return res.status(400).json({
            error: 'Invalid query'
        });
    }

    let results = {
        gov: 0,
        weather: 0
    };

    try {
        results.gov = await getGovData(state, `${year}-01-01`, `${year}-12-31`);

        for (let month = 0; month < 12; month++) {
            const weatherData = await getWeatherData(state, month, Number(year));

            // Média da amplitude térmica
            results.weather += weatherData.results.reduce((amplitude, { temperature }) => {
                return amplitude += (temperature.maximum.value - temperature.minimum.value);
            }, 0)/(12 * weatherData.results.length);
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            results,
        });
    }

    return res.status(200).json({
        results,
    });
});

api.get('/data-per-season', async (req, res) => {
    const { state, year, season } = req.query;

    if (!perSeasonValidator(req.query)) {
        return res.status(400).json({
            error: 'Invalid query'
        });
    }

    let results = {
        gov: 0,
        weather: 0
    };

    const seasons = {
        'summer': [0, 1, 2],
        'autumn': [3, 4, 5],
        'winter': [6, 7, 8],
        'spring': [9, 10, 11]
    }

    try {
        for (let month of seasons[season]) {
            const { start, end } = getMonthRange(month, Number(year));

            results.gov += await getGovData(state, start, end);

            const weatherData = await getWeatherData(state, month, Number(year));

            // Média da amplitude térmica
            results.weather += weatherData.results.reduce((amplitude, { temperature }) => {
                return amplitude += (temperature.maximum.value - temperature.minimum.value);
            }, 0)/(3 * weatherData.results.length);
        }
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            results,
        });
    }

    return res.status(200).json({
        results,
    });
});

export default api;
