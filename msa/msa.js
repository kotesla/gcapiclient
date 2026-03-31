const { encrypt, decrypt } = require("../shared/cypher");
const { transport } = require("../shared/transport");
const { throwWhenInvalidInput } = require("./input");
const { printObj } = require("../shared/utils");

async function msa() {
  // Tool axes measurements is a Nx6 matrix in the form of
  // [[gx,gy,gz,bx,by,bz],[gx,gy,gz,bx,by,bz], ...]
  // where:
  // -- N is number of survey stations
  // -- gx, gy, gz are accelerometer readings in Std G.
  // -- bx, by, bz are magnetometer readings in Gauss
  const mAxes = JSON.parse(
    "[[0.007324,-0.098877,0.997315,-0.06731000000000001,-0.011510000000000001,-0.7111500000000001],[-0.046387,-0.117187,0.994873,-0.09521,-0.015690000000000003,0.58838],[-0.013428,-0.164795,0.98877,-0.09382000000000001,-0.08894,0.5821000000000001],[-0.164795,-0.145263,0.977783,-0.16636,-0.035230000000000004,0.5702400000000001],[-0.148926,0.231934,0.964356,-0.028950000000000004,0.19985000000000003,0.5604800000000001],[-0.299072,0.15625,0.943604,-0.15799000000000002,0.17613,0.5465300000000001],[-0.019531,-0.401611,0.91919,-0.09452,-0.25565000000000004,0.5290900000000001],[-0.338135,0.305176,0.892334,-0.16427000000000003,0.25774,0.51095],[0.455322,-0.230713,0.863037,0.25495,-0.21868,0.49142],[-0.435791,0.372315,0.822754,-0.22287,0.29611000000000004,0.46491000000000005],[0.550537,0.300293,0.782471,0.38330000000000003,0.11963000000000001,0.43771000000000004],[-0.649414,-0.196533,0.738526,-0.42794000000000004,-0.04778,0.40911000000000003],[-0.428467,-0.567627,0.706787,-0.32889,-0.30448000000000003,0.39028],[-0.743408,-0.172119,0.650635,-0.47607000000000005,-0.030340000000000002,0.35400000000000004],[-0.809326,-0.085449,0.584717,-0.5032800000000001,0.025460000000000003,0.31355000000000005],[0.584717,-0.606689,0.543213,0.30099000000000004,-0.42306000000000005,0.28634000000000004],[0.811768,-0.292969,0.511475,0.46631000000000006,-0.25077,0.26681000000000005],[0.864258,0.026856,0.506592,0.527,-0.061040000000000004,0.26402000000000003],[0.704346,-0.489502,0.518799,0.38470000000000004,-0.36098,0.27030000000000004],[0.540772,0.666504,0.517578,0.38888000000000006,0.3561,0.27030000000000004],[-0.321045,0.784912,0.535889,-0.12381,0.50677,0.28076],[0.585938,0.611572,0.537109,0.4126,0.31913,0.28076],[0.383301,0.755615,0.535889,0.30308,0.42515000000000003,0.28076],[-0.435791,0.726318,0.537109,-0.19915000000000002,0.48235000000000006,0.28146000000000004],[-0.843506,0.081787,0.537109,-0.50746,0.12591000000000002,0.28076],[-0.063476,-0.844726,0.537109,-0.11614000000000001,-0.5088600000000001,0.28216],[-0.817871,0.206299,0.541992,-0.47956000000000004,0.20054000000000002,0.28495000000000004]]",
  );

  // Field reference values is a Nx3 matrix in the form of
  // [[refG,refB,refD],[refG,refB,refD], ...]
  // where:
  // -- N is number of stations
  // -- refG is ref. gravity field value (Std G.)
  // -- refB is ref. magnetic field intensity value (Gauss)
  // -- refD is ref. dip value (radians)
  const mRef = JSON.parse(
    "[[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974],[1.0014,0.59238,1.423839603776974]]",
  );

  // Accelerometer set of terms. Reserved for future use.
  // We have not yet decided whether we want to adjust
  // accelerometer data. Given the uncertainty of reference
  // values, accelerometer data remains the only reliable
  // source of truth we can exploit, hence the hesitation.
  const accTerms = null;

  // Magnetometer set of terms is a 6x1 array
  // in the form of [ScaleX,BiasX,ScaleY,BiasY,ScaleZ,BiasZ].
  // These values should be taken from the error model.
  // Note: the last array element is a combination of
  // Bz sensor bias and drill-string interference. These two
  // independent error sources act along the same axis.
  const magTerms = [
    0.0008, // MSX,
    35 * 1e-5, // MBX (Gauss)
    0.0008, // MSY
    35 * 1e-5, // MBY (Gauss)
    0.0008, // MSZ
    Math.sqrt(35 * 35 + 100 * 100) * 1e-5, // SQRT(MBZ^2+AMIBZ^2) (Gauss)
  ];

  // Number of standard deviations to evaluate solution fitness.
  // Typically, this is the same number as the one used in collision
  // avoidance rules.
  const stdDev = 2;

  // Maximum percent of outlier stations allowed in the set.
  // User can choose any value between 0 and 15. Should user provide
  // any value > 15%, the system will automatically reset it to 15%.
  // Having to remove more than 15% of the dataset indicates inconsistent
  // data and should be dealt with separately.
  const pcOutliersUser = 15;

  // Private key to encode data in transit. Although secure HTTPS
  // transport is used by default, some users prefer an extra security
  // layer they can control.
  const privateKey = "ABCDEFG"; // private key here

  throwWhenInvalidInput(
    mAxes,
    mRef,
    accTerms,
    magTerms,
    stdDev,
    pcOutliersUser,
  );

  // Create payload
  let payload = {
    mAxes: mAxes,
    mRef: mRef,
    accTerms: accTerms,
    magTerms: magTerms,
    stdDev: stdDev,
    pcOutliersUser: pcOutliersUser,
  };

  // Serialize payload
  payload = JSON.stringify(payload);
  // Encrypt payload
  payload = encrypt(payload, privateKey);
  // Send payload to API server and receive reply
  const reply = await transport("https", "api.geocertainty.com", "80", "msa", {
    payload: payload,
  });
  // Decrypt reply
  payload = decrypt(reply.payload, privateKey);
  // De-serialize reply
  payload = JSON.parse(payload);
  return payload;
}

msa()
  .then((s) => {
    printObj(s);
  })
  .catch((e) => {
    console.log(e);
  });
