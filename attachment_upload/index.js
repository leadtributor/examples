const axios = require('axios');
const fs = require("fs");

const LEADTRIBUTOR_URL = 'https://api.leadtributor.cloud';
const API_KEY = '' || process.env['API_KEY'];
const LEAD_ID = '' || process.env['LEAD_ID'];

(async function() {

    // Step 1: announce the upload of a new attachment to a lead
    const announceUploadResponse = await axios.post(`${LEADTRIBUTOR_URL}/leads/${LEAD_ID}/attachments`, {
        "filename": "test.txt",
        "contentType": "text/plain"
    }, {
        headers: {
            Authorization: API_KEY
        }
    }).then(response => response.data);

    // Step 2: prepare upload request
    const uploadPayload = new FormData();
    Object.entries(announceUploadResponse['fields']).forEach(([name, value]) => uploadPayload.append(name, value));

    const file = fs.readFileSync('./test.txt');
    uploadPayload.append('file', file);

    // Step 3: upload the attachment
    const uploadResponse = await axios.post(announceUploadResponse['uploadUrl'], uploadPayload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
})();