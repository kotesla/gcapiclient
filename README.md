# gcapiclient
API ver. 0.1.0

API function and code examples for connecting to Geocertainty API 

Folder structure:
1. Functions under /api/functions
2. Examples of use under /api/examples

Compute functions:
1. getErrorModelListAsync - returns the full list of error models supported by the API (specifications)
2. getErrorModelListShortAsync - returns the short list of error models supported by the API, primarily for the purpose of getting error model ids for use in other function calls
3. getComputeAsync - returns interpreted MWD surveys with all corrections applied and qc flags as per error model specifications.

Access management functions:
1. getTokenInfoAsync - returns token information
2. getCallHistoryAsync - returns api call history for a given token
3. getBalanceAsync - returns daily quota of API calls remaining

ABOUT COMPUTE

API compute has been designed to make directional survey interpretation accessible to users with little to no experience in the subject. All user is required to do is to supply a set of raw inputs and the id of the target error model to use. The rest is taken care of by the API. The set of inputs required is hard-coded into Payload object properties, preventing mistakes and omissions.

Units of measure:
1. Gravity: relative to std. G (where 1 std. G = 9.80665 m/s2)
2. Magnetic field intensity: Gauss (where 1 Gauss = 1e5 nT)
3. Angles: radians (where 1 radian = 180/PI)  

Geomagnetic models support (as of April 2006):
1. BGGM
2. LRGM
3. HRGM
4. IFR1
5. IFR2

Technically, these geomagnetic reference models differ from one another in error term values for DECG (AZ), DECR, DBH, DBHR, MDI, MDIR, MFI, MFIR. Custom geomagnetic models can be added into the system provided that user supplies these error term values.  

API runs on reference data provided by the user (Gref, Bref, Dref). It is user's responsibility to ensure that accuracy of the reference data supplied meets the specs of the error model id used in API inputs.      

Error models support (as of April 2006):
1. ISCWSA Rev. 4 (BGGM, Std)
2. ISCWSA Rev. 4 (BGGM, Axial)
3. ISCWSA Rev. 4 (BGGM, MSA)
4. OWSG Rev. 2 (IFR1, MSA)

API supports error models that follow ISCWSA rev. 4 / OWSG Rev.2 protocols and make use of axial/multi-station corrections or use no corrections at all. Many more models can be created by tweaking error terms of these existing models, provided they follow the same principle. Pls make a request if you need a new model created to fit your specific use case.

Error model names were made intentionally verbose to help inexperienced users navigate the subject. For example, conventional approach is to drop "BGGM" identifier in error model arguments whenever BGGM is used for geomagnetic model, so, keep that in mind when looking for equivalents in your well planning software.

ABOUT DEPTH AND TIME

API does not use depth or time as input parameters. Instead, API ensures the order of input always matches the order of output. It is user's responsibility to assign proper identifiers (depth, time) to the data sequence.    

ABOUT MSA CORRECTION

A user must ensure that dataset is consistent, i.e. dataset surveys have been acquired by the same BHA and the same MWD tool. Should there be noisy surveys or surveys from different BHAs, algorithm will be removing outliers until a viable solution is found or until the outlier limit is reached. The default outlier limit is 15 percent of the dataset. If no viable solution is found after having reached the outlier limit, algorithm will return an empty solution. User can set custom percent of outliers from 0% to 15% when creating Payload object (see compute example). Any custom outlier limit above 15% will be reset to 15% by the system. Outlier stations, when detected, do not have any effect on the corresponding MSA solution.

For results, API returns magnetometer bias and scale values used to correct the MWD measurements, magnetometer bias and scale uncertainties, outlier indices (zero based), qc flags, corrected axes measurements.

ABOUT AXIAL CORRECTION

API returns 2 sequences of results. First sequence is the best solution results, second sequence is the second-best solution results. Each sequence element has relevant qc flags. 

API is likely to yield an unstable solution at sensor attitudes in the no-go zone (sin(Inc)*sin(Az magnetic) >= 0.85). These are natural constraints of the algorithm and have nothing to do with the implementation. Sensor degradation may accelerate the onset of these effects.  

ABOUT ACCESS MANAGEMENT

API access is managed by use of tokens. Each token consists of a public key and a private key. Public key is sent across the network to identify the token in use. Private key is kept secret and is used by the both client API and server back-end to encode/decode sensitive user information for transit, adding an extra security layer a user can control.

Each API function is designed to call server at a specific URL extension. To prevent abuse of company's compute resources, each token limits the number of times each API function can be called during the 24-hour period. User can obtain the detailed information about token capacity, remaining daily quotas and API call history by calling the relevant API functions listed above.

Default token capacity:
1. Compute function: 100 calls per day, 300 surveys per call
2. Other functions: 500 calls per day  

Default token capacity was chosen to meet the needs of a working rig that takes less than 100 surveys per day on average. Pls make a request should your specific use case require different token capacity. 
   
Individual tokens can be requested at:
1. https://geocertainty.com/en/#rec548900416 (website)
2. https://t.me/geocertainty (Telegram)
3. https://www.linkedin.com/in/slava-kotelnikov-229210130/ (LinkedIn)