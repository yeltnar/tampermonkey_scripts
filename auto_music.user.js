// ==UserScript==
// @name        auto_music
// @namespace   andbrant
// @match       https://musicbrainz.org/*auto_music*
// @grant       none
// @version     0.2
// @author      -
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/timeoutPromise.notauser.js
// @dont-require     https://github.com/yeltnar/tampermonkey_scripts/raw/master/textEleSearch.notauser.js
// @description 1/18/2026, 4:11:04 PM
// ==/UserScript==

async function getReleaseGroupFromBarcode(barcode) {
  // 1. Define the URL
  const url = `https://musicbrainz.org/ws/2/release?query=barcode:${barcode}&fmt=json`;

  try {
    // 2. Perform the fetch
    // Note: MusicBrainz identifies you via the User-Agent.
    // In a browser, the User-Agent is set by the browser itself.
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 3. Navigate the JSON structure
    if (data.releases && data.releases.length > 0) {
      const release = data.releases[0];
      const releaseGroup = release['release-group'];

      return {
        title: releaseGroup.title,
        releaseGroupId: releaseGroup.id,
        lidarrSearch: `lidarr:${releaseGroup.id}`
      };
    } else {
      return "No release found for this barcode.";
    }
  } catch (error) {
    console.error("Could not fetch data from MusicBrainz:", error);
  }
}

const query = new URLSearchParams(window.location.search).get('query')

// Example Usage:
getReleaseGroupFromBarcode(query).then(result => {
  console.log("Album Info:", result);
  return result;
}).then((result)=>{
  window.location.href = `https://lidarr.h.lan/add/search?term=lidarr%3A${result.releaseGroupId}`;
});

