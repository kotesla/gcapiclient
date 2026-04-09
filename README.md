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
1. getErrorModelListAsync - returns the full list of error models supported by the API (specifications)
2. getErrorModelListShortAsync - returns the short list of error models supported by API, primarily for the purpose of getting error model ids for use in other function calls
3. getComputeAsync - returns interpreted MWD surveys with all corrections applied and qc flags as per error model specifications.  

Access management

API access is managed by use of tokens. Each token consists of a public key and a primary key. Public key is sent across the network to identify the token in use. Private key is kept secret and is used by the both client API and server back-end to encode/decode sensitive user information for transit, adding an extra security layer a user can control.

Each API function is designed to call server at a specific URL extension. To prevent abuse of company's compute resources, each token limits the number of times each API function can be called during the day. User can obtain the detailed information about token capacity, remaining daily quotas and API call history by calling the relevant API functions listed above.
   
Individual tokens can be requested at:
-- https://geocertainty.com/en/#rec548900416 (website)
-- https://t.me/geocertainty (Telegram)
-- https://www.linkedin.com/in/slava-kotelnikov-229210130/ (LinkedIn)

Compute

API compute has been designed to make directional survey interpretation accessible to users with little to no experience in the subject. All user is required to do is to supply a set of raw inputs and the id of the target error model to use. The rest is taken care of by the API. The set of inputs required is hard-coded into Payload object properties, preventing mistakes and omissions.      
 

