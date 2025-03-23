// WARNING: In a production app, you should never expose your client ID and secret in the frontend
// These credentials should be handled by a backend service
// This implementation is for demonstration purposes only

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Cache the token and its expiration
let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export async function getSpotifyAccessToken(): Promise<string> {
  // Check if we have a valid token already
  if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return accessToken;
  }

  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ebd03e9b456d4de0885684e128f6c85d:04c6330718a34e4dabfa066482932b58')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    
    if (data.access_token) {
      accessToken = data.access_token;
      // Set expiration time (subtract 60 seconds as a buffer)
      tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;
      if (accessToken) {
        return accessToken;
      } else {
        throw new Error('Failed to get Spotify access token');
      }
    } else {
      throw new Error('Failed to get Spotify access token');
    }
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

export async function searchSpotify(query: string, type: string = 'track', limit: number = 5): Promise<any> {
  if (!query) return { tracks: { items: [] } };
  
  try {
    const token = await getSpotifyAccessToken();
    
    const response = await fetch(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return { tracks: { items: [] } };
  }
} 