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

function saveConfig(saveData) {
  localStorage.pulpPlus = JSON.stringify(saveData);
}

function loadConfig() {
  // Retrieve your data from localStorage OR grab default config
  const savedConfig = JSON.parse(localStorage.pulpPlus || null);
  return {...defaultConfig, ...savedConfig}
}

function addStyle(styles) {

  const css = createElement('style', {
    type: 'text/css'
  });

  if (css.styleSheet) {
    css.styleSheet.cssText = styles;
  } else {
    css.appendChild(document.createTextNode(styles));
  }

  document.getElementsByTagName("head")[0].appendChild(css);
}

function addScript(url) {
  const script = createElement('script', {
    src: url
  });

  document.head.appendChild(script)
}

function createElement(type, props) {
  var $e = document.createElement(type);

  for (const prop in props) {
    $e[prop] = props[prop];
  }

  return $e;
}

function relocateNode(node, target) {
  node.parentNode.removeChild(node);
  target.appendChild(node);
}

const config = loadConfig();
const {
  biggerSearchResults,
  tilesForBigScreen,
  responsiveScriptView,
  prettyPrintExportButtons,
  openScriptButton,
  screenshot,
  customTheme,
  removeFooter,
  scriptSelectPlayerPriority,
} = config;

if ( screenshot.enabled ) {
  addScript("https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js");

  function saveScreenshot(canvas) {
    const fileName = "pulp-screenshot";
    const link = document.createElement("a");
    link.download = fileName + ".png";
    console.log(canvas);
    canvas.toBlob(function (blob) {
      console.log(blob);
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }

  function screenshotRoom(){
    let div = one('#room-pane .grid');
    html2canvas(div).then(saveScreenshot)
  }

  const button = createElement('button', {
    type: "button",
    onclick: screenshotRoom,
    innerText: "Screenshot room"
  });

  const buttonContainer = createElement('div', {
    className: "wrap",
  });

  buttonContainer.appendChild(button);
  one('#room-pane').appendChild(buttonContainer);
}

if ( biggerSearchResults.enabled ) {
  const styles = `
    #search-wrap #results-list { 
      width: 600px;
    }
    #search-wrap #results-list li:not(.label), #select-options { 
      max-width: 100%; 
    }
  `;

  addStyle(styles);
}

if ( responsiveScriptView.enabled ) {
  const styles = `
    #mode-script { 
      width: 100%; 
    }
    #game-pane, #script-pane { 
      width: 100%; 
    }
  `;

  addStyle(styles);
}

if ( customTheme.enabled ) {
  one('#theme-stylesheet').href = ""

  addStyle(` 
    .theme {
    /* default */
    --ui-color-primary: ${customTheme.theme.colorPrimary}; /* text */
    --ui-color-secondary: ${customTheme.theme.colorSecondary}; /* background */
    --ui-color-tertiary: ${customTheme.theme.colorTertiary}; /* text on frame */
    --ui-color-key: ${customTheme.theme.colorKey}; /* active */
    --ui-color-call: ${customTheme.theme.colorCall}; /* interactive */
    --ui-color-void: ${customTheme.theme.colorVoid}; /* frame */
  
    --ui-color-primary-alpha-10: rgba(50,47,39,0.1);
    --ui-color-primary-alpha-20: rgba(50,47,39,0.2);
    --ui-color-primary-alpha-50: rgba(50,47,39,0.5);
    --ui-color-secondary-alpha-50: rgba(177,174,168,0.5);
    --ui-color-key-alpha-50: #d8b370; /* 50% key on #b1aea8 (specifically, not --ui-color-secondary), pre-baked */
    --ui-color-call-alpha-50: var(--ui-color-secondary-alpha-50);
  }`);

  const themeSelect = document.getElementById('theme-select');
  themeSelect.innerText = "Custom"
}

if ( tilesForBigScreen.enabled ) {

  let styles = `
    #tiles-container { 
      padding: 8px 32px; 
    }
    #tiles-container .export-import { position: relative; }
    #tiles-container .layer-info { width: 100%; }
    #tiles-container { flex-direction: column; }
    #tiles-container .col { margin-left: 0; }
  `;

  addStyle(styles);

  const tilesContainer = document.getElementById("room-pane").getElementsByClassName('row')[0];
  tilesContainer.id = "tiles-container";

  document.getElementById("mode-room").appendChild(tilesContainer);

  document.getElementById("layers").style.width = '100%';
  document.getElementById("layers").style.maxWidth = '640px';

  if ( tilesForBigScreen.responsive ) {
    document.getElementById("room-tiles").style.maxWidth = '100%';
  }

  if ( tilesForBigScreen.scrollbar ) {
    let styles = `
      #tiles-container { 
        height: calc(100vh - 80px); 
        overflow-y: scroll; 
      }
    `;

    addStyle(styles);
  }

  if ( tilesForBigScreen.layersGrid ) {
    let styles = `
      #layers { 
        display: grid;
        grid-template-areas: "1fr 1fr 1fr"; 
      }
    `;

    addStyle(styles);
  }
}

if ( prettyPrintExportButtons.enabled ) {

  if (prettyPrintExportButtons.project) {
    function prettyExportJSON() {
      var json = JSON.stringify(data, null, 2);
      var a = document.createElement('a');
      var blob = new Blob([json], {'type':'application/octet-stream'});
      a.href = window.URL.createObjectURL(blob);
      a.download = (data.name || 'Untitled Pulp Game')+'.json';
      a.click();
    }

    const exportButtons = document.getElementById('download').parentElement.parentElement;

    const button = createElement('button', {
      type: "button",
      onclick: prettyExportJSON,
      innerText: "Pretty Export"
    });

    const container = createElement('div',{
      className: "wrap"
    });

    container.append(button);
    exportButtons.append(container);
  }

  if ( prettyPrintExportButtons.sound ) {

    function prettyExportAudioJSON() {
      var json = JSON.stringify(data.sounds, null, 2);
      var a = document.createElement('a');
      var blob = new Blob([json], {'type':'application/octet-stream'});
      a.href = window.URL.createObjectURL(blob);
      a.download = 'pulp-sounds.json';
      a.click();
    }

    const exportButtons = document.getElementById('sounds-modifier');

    const button = createElement('button',{
      type: "button",
      onclick: prettyExportAudioJSON,
      innerText: "Pretty Export"
    });

    const container = createElement('div',{
      className: "wrap"
    });

    container.append(button);
    exportButtons.append(container);
  }
}

if ( scriptSelectPlayerPriority.enabled ) {

  var scriptSelect = one('#script-select');

  const label = createElement('li', {
    className: "label",
    innerText: "Player"
  });

  const player = createElement('li', {
    innerText: "player"
  });
  player.setAttribute("data-value", "1");

  scriptSelect.prepend(player)
  scriptSelect.prepend(label)

  function scriptSelectPlayerPriorityCallback(mutations) {
    if ( scriptSelect.children[0] === label ) {
      return;
    }

    scriptSelect.prepend(player)
    scriptSelect.prepend(label)
  }

  let observer = new MutationObserver(scriptSelectPlayerPriorityCallback);
  observer.observe(scriptSelect, {
    childList: true,
  });
}

if ( removeFooter.enabled ) {
  const customFooter = document.getElementById('custom-footer');
  customFooter.remove();
}

if ( openScriptButton.enabled ) {

  const styles = `
    #mode-script #go-to-script { 
      display: none; 
    }
    #mode-room #script-events { 
      position: absolute;
      right: 9999px;
    }
  `;

  addStyle(styles);

  function openScript() {
    const modeId = EditorMode.Script
    data.editor.activeModeId = modeId;
    document.body.dataset.editorMode = modeId;

    each('#modes li.active', function(i,node) {
      node.classList.remove('active');
    });
    each('#modes li:nth-child('+(modeId+1)+')', function(i,node) {
      node.classList.add('active');
    });

    var sharedEditor = one('#shared-editor');

    relocateNode(sharedEditor, one('#script-script-editor'));
  }

  const scriptModifiers = document.getElementById('script-modifiers');

  const button = createElement('button',{
    type: "button",
    id: "go-to-script",
    onclick: openScript,
    innerText: "Open script"
  });

  scriptModifiers.append(button);

  function openScriptButtonCallback(mutations) {
    // just a small hack to make the scrip editor resize.
    window.dispatchEvent(new Event('resize'));
  }

  const scriptEditorAceContent = one('#script-editor .ace_content');
  let observer = new MutationObserver(openScriptButtonCallback);
  observer.observe(scriptEditorAceContent, {
    attributes: true,
  });
}

function addSettingsContainer() {
  function saveSettings() {
    try {
      var configInput = document.getElementById('config').value;
      var jsonConfig = JSON.parse(configInput);
      saveConfig(jsonConfig);
      alert("Settings have been saved! Don't forget to refresh the page.");
    } catch {
      alert("An error occured! check your json");
    }
  }

  function resetSettings() {
    try {
      saveConfig(defaultConfig);
      alert("Settings have been reset! Don't forget to refresh the page.");
    } catch {
      alert("An error occured! check your json");
    }
  }

  const settingsContainer = createElement('div',{
    id: "settings-container",
    className: "hidden",
    style: "box-shadow: 0 0 0 1px var(--ui-color-primary), 0 0 0 3px var(--ui-color-key); padding: 1rem; background-color: #b1aea8; position: fixed; top: 50%; left: 50%; width: 500px; transform: translate(-50%, -50%); z-index: 9999;"
  });

  const settingstextArea = createElement('textarea',{
    id: "config",
    style: "width: 100%; height: 400px; margin-bottom: 1rem;",
    value: "config bla"
  });

  const saveSettingsButton = createElement('button',{
    type: "button",
    onclick: saveSettings,
    innerText: "Save"
  });

  const resetSettingsButton = createElement('button',{
    type: "button",
    onclick: resetSettings,
    innerText: "Reset"
  });

  const closeSettingsButton = createElement('button',{
    type: "button",
    onclick: toggleSettingsContainer,
    innerText: "Close"
  });

  settingsContainer.appendChild(settingstextArea)
  settingsContainer.appendChild(saveSettingsButton)
  settingsContainer.appendChild(resetSettingsButton)
  settingsContainer.appendChild(closeSettingsButton)

  document.getElementById('main').appendChild(settingsContainer);

  const saveData = loadConfig();
  const configInput = document.getElementById('config')
  configInput.value = JSON.stringify(saveData, null, 2);
}

const styles = '#settings-container.hidden { display: none; }';

addStyle(styles);
addSettingsContainer();

const saveSettingsButton = createElement('button', {
  type: "button",
  onclick: toggleSettingsContainer,
  innerText: "Pulp+ Settings"
});

const settingsButtonContainer = createElement('div', {
  className: "wrap"
});

settingsButtonContainer.append(saveSettingsButton);

const editorPane = document.getElementById('editor-pane');
editorPane.append(settingsButtonContainer);

function toggleSettingsContainer() {
  const exportButtons = document.getElementById('settings-container');
  exportButtons.className = exportButtons.className === "hidden" ? "": "hidden"
}
