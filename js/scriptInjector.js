{
  const defaultConfig = {
    biggerSearchResults: { enabled: true },
    prettyPrintExportButtons: {
      enabled: true,
      project:true,
      sound: true
    },
    responsiveScriptView: { enabled: true },
    openScriptButton: { enabled: true },
    customTheme: {
      enabled: false,
      theme: {
        colorPrimary: 'var(--ui-color-playdate-black)',
        colorSecondary: 'var(--ui-color-playdate-white)',
        colorTertiary: 'var(--ui-color-secondary)',
        colorKey: 'var(--ui-color-playdate-yellow)',
        colorCall: 'var(--ui-color-secondary)',
        colorVoid: 'black',
      },
    },
    removeFooter: { enabled: true },
    tilesForBigScreen: {
      enabled: true,
      scrollbar: true,
      responsive: false,
      layersGrid: true
    },
    scriptSelectPlayerPriority: {
      enabled: true
    },
    screenshot: {
      enabled: true
    }
  }

  function initAndUpdateConfig() {
    const savedConfig = JSON.parse(localStorage.pulpPlus || null);
    localStorage.pulpPlus = JSON.stringify({...defaultConfig, ...savedConfig, defaultConfig: defaultConfig});
  }

  function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
  }

  initAndUpdateConfig();
  injectScript( chrome.runtime.getURL('/js/injectedScript.js'), 'body');
}
