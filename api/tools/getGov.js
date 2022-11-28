import { dadosGov } from '../services/index.js';

export async function getGovData(state, start, end) {
    const getGov = dadosGov[state];

    const { count } = (await getGov({
        data: {
            "query": {
                "range": {
                    "dataNotificacao": {
                        "gte": start,
                        "lt": end
                    }
                }
            }
        }
    })).data;

    return count;
}
