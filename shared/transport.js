const axios = require('axios');

async function transport(scheme, ip, port, ext, msg) {
    let url = `${scheme}://${ip}:${port}/${ext}`;
    const config = {
        method: 'post',
        url: url,
        data: msg,
        headers: { 'Content-Type': 'application/json' },
    };
    let res = await axios(config);
    return res.data;
}

module.exports = { clientTransport: transport };
