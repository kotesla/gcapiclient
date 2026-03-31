const { createSensorTerms } = require('../sensor');
const {
    readFileFromPathname,
} = require('../../../shared/filesystem');
const {
    takeFirstElements,
    printObj,
} = require('../../../shared/utils');
const {
    clientTransport,
} = require('../../../shared/clientTransport');
const { encrypt, decrypt } = require('../../../lib/cypher');

async function pm2test() {
    const accTerms = createSensorTerms(
        0.0008,
        35 * 1e-5,
        0.0008,
        35 * 1e-5,
        0.0008,
        Math.sqrt(35 * 35 + 100 * 100) * 1e-5
    );
    const magTerms = createSensorTerms(
        0.0008,
        35 * 1e-5,
        0.0008,
        35 * 1e-5,
        0.0008,
        Math.sqrt(35 * 35 + 100 * 100) * 1e-5
    );
    let matlab_in = await readFileFromPathname(
        'C:\\Home\\Dev\\gcapi\\services\\msa\\test\\input.json'
    );
    matlab_in = JSON.parse(matlab_in);
    matlab_in = takeFirstElements(matlab_in, 155);

    const tasks = [];
    const res = [];

    for (let r of matlab_in) {
        tasks.push(
            new Promise(async (resolve) => {
                let payload = encrypt(
                    JSON.stringify({
                        mAxes: r.mAxii,
                        mRef: r.mRef,
                        accTerms: accTerms,
                        magTerms: magTerms,
                        numSko: 2,
                        pcOutliersUser: 15,
                    }),
                    'ABCDEFG'
                );
                const msg = await clientTransport(
                    'http',
                    '192.168.2.100',
                    '3000',
                    'msa',
                    { payload: payload }
                );
                payload = decrypt(msg.payload, 'ABCDEFG');
                payload = JSON.parse(payload);
                res.push(payload);
                resolve();
            })
        );
    }
    await Promise.all(tasks).catch(() => {
        throw new Error('Promise error');
    });
    return res;
}

pm2test().then((res) => {
    printObj(res);
});
// .catch(() => {
//     throw new Error('error');
// });
