'use strict';

module.exports.getEvents = async (event) => {
  const city = event.queryStringParameters?.city;
  const apiKey = process.env.TICKETMASTER_API_KEY;

  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode: "DE",
    size: "100",
    sort: "date,asc",
  });

  if (city) {
    params.append("city", city);
  }

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ticketmaster request failed: ${response.status}`);
    }

    const data = await response.json();
    const events = data._embedded?.events || [];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ events }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Could not fetch events",
      }),
    };
  }
};