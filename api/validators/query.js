import Ajv from 'ajv';

const ajv = new Ajv();

const perMonthSchema = {
    type: 'object',
    properties: {
        state: { type: 'string' },
        year: { type: 'string' },
        month: { type: 'string' }
    },
    required: ['year', 'month', 'state']
};

const perYearSchema = {
    type: 'object',
    properties: {
        state: { type: 'string' },
        year: { type: 'string' },
    },
    required: ['year', 'state']
};

const perSeasonSchema = {
    type: 'object',
    properties: {
        state: { type: 'string' },
        year: { type: 'string' },
        season: { type: 'string' }
    },
    required: ['year', 'season', 'state']
};

export const perMonthValidator = ajv.compile(perMonthSchema);
export const perYearValidator = ajv.compile(perYearSchema);
export const perSeasonValidator = ajv.compile(perSeasonSchema);
