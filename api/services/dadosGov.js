import axios from 'axios';

/**
 * @typedef {(
 * | 'ac'
 * | 'al'
 * | 'ap'
 * | 'am'
 * | 'ba'
 * | 'ce'
 * | 'df'
 * | 'es'
 * | 'go'
 * | 'ma'
 * | 'mt'
 * | 'ms'
 * | 'mg'
 * | 'pr'
 * | 'pb'
 * | 'pa'
 * | 'pe'
 * | 'pi'
 * | 'rn'
 * | 'rs'
 * | 'rj'
 * | 'ro'
 * | 'rr'
 * | 'sc'
 * | 'se'
 * | 'sp'
 * | 'to'
 * | '*'
 * )} State
 */

const dadosGov = new Proxy({}, {
    get(_, state, receiver) {
        return receiver[state] = axios.create({
            baseURL: `https://elasticsearch-saps.saude.gov.br/desc-esus-notifica-estado-${state}/_count`,
            method: 'get',
            auth: {
                username: 'user-public-notificacoes',
                password: 'Za4qNXdyQNSa9YaA'
            }
        });
    }
});

export default dadosGov;
