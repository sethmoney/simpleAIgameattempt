const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const url = `${process.env.URL}/.netlify/functions/scores.json`; // Adjust this URL as needed

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Assuming `data` is an array of score objects { initials: "AAA", score: 100 }
    // Sort by score in descending order and take the top 10
    const topScores = data.sort((a, b) => b.score - a.score).slice(0, 10);

    return {
      statusCode: 200,
      body: JSON.stringify(topScores),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Failed to fetch scores', error: error.toString() }),
    };
  }
};
