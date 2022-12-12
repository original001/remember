import fetch from 'node-fetch'

const apiUrl = "https://od-api.oxforddictionaries.com/api/v2/translations/en/ru";

export const handler = async (event, context, lambdaCallback) => {
  const word = event.queryStringParameters.word;

  const response = await fetch(`${apiUrl}/${word}?strictMatch=true`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      app_id: "14b2240f",
      app_key: "c24dd402702cc4364338913daf032813",
    },
  });
  
  const json = await response.json();
  
  return json.results;
};
