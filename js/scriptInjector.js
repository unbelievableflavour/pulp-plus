{
  const modules = [
    "biggerSearchResults",
    "biggerInputFields",
    "betterTiles",
    "customTheme",
    "exampleProjects",
    "openScriptButton",
    "prettyPrintExportButtons",
    "removeFooter",
    "responsiveScriptView",
    "screenshot",
    "scriptSelectPlayerPriority",
    "scriptSidebarWidth"
  ];

  const defaultConfig = {
    biggerSearchResults: { enabled: true },
    betterTiles: {
      enabled: true,
      scrollbar: true,
      responsive: false,
      layersGrid: true,
      desktopMode: true,
      layersAboveTiles: true,
      lockedTilesCount: false,
    },
    biggerInputFields: {
      enabled: true,
      tileName: true,
      roomName: true,
      songName: true,
      soundName: true,
    },
    prettyPrintExportButtons: {
      enabled: true,
      project:true,
      sound: true
    },
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
    exampleProjects: { enabled: true },
    removeFooter: { enabled: true },
    responsiveScriptView: { enabled: true },
    screenshot: {
      enabled: true
    },
    scriptSelectPlayerPriority: {
      enabled: true
    },
    scriptSidebarWidth: {
      enabled: true,
      maxWidth: '100%'
    }
  }

  function initAndUpdateConfig() {
    const savedConfig = JSON.parse(localStorage.pulpPlus || null);
    const updatedConfig = {...defaultConfig, ...savedConfig, defaultConfig: defaultConfig};
    localStorage.pulpPlus = JSON.stringify(updatedConfig);
    return updatedConfig;
  }

  function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');

    s.setAttribute('id', 'injectedScript');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
  }

  function addModule(url){
    const script = document.createElement('script');
    script.setAttribute('src', chrome.runtime.getURL(`/js/modules/${url}.js`));

    document.head.appendChild(script)
  }

  function loadModules() {
    modules.forEach((module) => {
      if ( config[module] && config[module].enabled ) {
        addModule( module);
      }
    });
  }

  const config = initAndUpdateConfig();
  injectScript( chrome.runtime.getURL('/js/injectedScript.js'), 'body');
  document.querySelector('#injectedScript').addEventListener('load', loadModules);
}
