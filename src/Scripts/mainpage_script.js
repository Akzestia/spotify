


window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:track:1cAU2LwAyO2DDg6cVAoW3A'
      };
    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
};
