# gcapiclient
API function and code examples for connecting to Geocertainty API 

Folder structure:
1. Functions under /api/functions
2. Examples of use under /api/examples

Access management functions:
1. getTokenInfoAsync - returns token information
2. getCallHistoryAsync - returns api call history for a given token
3. getBalanceAsync - returns daily quota of API calls remaining
 
Compute functions:
1. getErrorModelListAsync - returns the full list of error models supported by the API
2. getErrorModelListShortAsync - returns the short list of error models supported by API, primarily for the purpose of getting error model ids for use in other function calls
3. getComputeAsync - returns interpreted MWD surveys with all corrections applied and qc flags as per error model specifications 

General information: Tokens to manage API access. Token consists of a public key and a primary key. Primary key is kept secret and is used to encode/decode sensitive user information when in transit.  
