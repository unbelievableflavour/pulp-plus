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
    const {
      biggerSearchResults,
      customTheme,
      openScriptButton,
      prettyPrintExportButtons,
      removeFooter,
      responsiveScriptView,
      screenshot,
      scriptSelectPlayerPriority,
      tilesForBigScreen
    } = initAndUpdateConfig();

    if ( biggerSearchResults.enabled ) {
      addModule( 'biggerSearchResults');
    }

    if ( customTheme.enabled ) {
      addModule( 'screenshot');
    }

    if ( openScriptButton.enabled ) {
      addModule( 'openScriptButton');
    }

    if ( prettyPrintExportButtons.enabled ) {
      addModule( 'prettyPrintExportButtons');
    }

    if ( removeFooter.enabled ) {
      addModule( 'removeFooter');
    }

    if ( responsiveScriptView.enabled ) {
      addModule( 'responsiveScriptView');
    }

    if ( screenshot.enabled ) {
      addModule( 'screenshot');
    }

    if ( scriptSelectPlayerPriority.enabled ) {
      addModule( 'scriptSelectPlayerPriority');
    }

    if ( tilesForBigScreen.enabled ) {
      addModule( 'tilesForBigScreen');
    }
  }

  injectScript( chrome.runtime.getURL('/js/injectedScript.js'), 'body');
  document.querySelector('#injectedScript').addEventListener('load', loadModules);
}
