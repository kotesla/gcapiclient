# gcapiclient
Code examples for connecting to Geocertainty API 

Functions under /api/functions

Access management functions:
1. getBalanceAsync - returns daily quota of API calls remaining
    args: publicKey, privateKey
    returns: {
        "daysBeforeExpire": 21.657865069444444,
        "callsRemainToday": {
            "compute": 97,
            "emdlList": 499, // errorModelList
            "emdlListShort": 499,
            "tokenInfo": 496,
            "balance": 475,
            "callHistory": 485
        }
2. getTokenInfoAsync - returns token information
3. getCallHistoryAsync - returns api call history

Compute functions:
1. getEmdlList - returns full list of error models supported by the API (id,name,args)
2. getEmdlListShort - returns short list of error models supported by API (id,name,args,)