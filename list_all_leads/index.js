const axios = require('axios');

const LEADTRIBUTOR_URL = process.env['LEADTRIBUTOR_URL'] || 'https://api.leadtributor.cloud';
const API_KEY = process.env['API_KEY'] || '';

(async function() {
    // iterate through all leads
    for await (const lead of listLeads()) {
        // log each lead
        console.log(lead);
    }
})();

/**
 * Generator function which iterates through all leads using continuations.
 */
async function* listLeads() {
    let continuation = null;
    do {
        const listLeadsResponse = await axios.get(`${LEADTRIBUTOR_URL}/leads`, {
            headers: { Authorization: API_KEY },
            params: { continuation },
        });
        continuation = listLeadsResponse.headers['x-continuation'];
        const leads = listLeadsResponse.data;
        for (const lead of leads ) yield lead;
    } while(continuation);
}