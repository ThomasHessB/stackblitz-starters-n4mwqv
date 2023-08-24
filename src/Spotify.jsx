const Spotify = {
  accessToken: null,
  expiresIn: 0,

  // Method to obtain and store access token from the URL
  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      this.accessToken = tokenMatch[1];
      this.expiresIn = Number(expiresInMatch[1]);

      // Clear the parameters from the URL
      window.setTimeout(() => (this.accessToken = ''), this.expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return this.accessToken;
    } else {
      // Handle error here (e.g., redirect user to login)
      // You can throw an error or redirect the user to a login page
      alert(ERROR)
    }
  },

  // Other methods for API requests...
};

export default Spotify;