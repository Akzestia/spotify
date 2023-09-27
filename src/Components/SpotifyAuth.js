import React, { useState, useEffect } from 'react';

const SpotifyAuth = () => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchAuthToken = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + (new Buffer.from('16a2505a2a24488a875f183c93c76089:6fbef267aa9a46bd915fbd9cc63d37a3').toString('base64')),
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
        }),
      });

      const body = await response.json();

      setAuthToken(body.access_token);
    };

    fetchAuthToken();
  }, []);

  return authToken;
};

export default SpotifyAuth;