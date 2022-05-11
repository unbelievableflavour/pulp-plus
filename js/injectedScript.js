
function saveStuff(saveData) {
  localStorage.pulpPlus = JSON.stringify(saveData);
}

function loadStuff() {
  return localStorage.pulpPlus;
}

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
  }
}

function addStyle(styles) {

  /* Create style element */
  var css = document.createElement('style');
  css.type = 'text/css';

  if (css.styleSheet)
    css.styleSheet.cssText = styles;
  else
    css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}

function relocateNode(node, target) {
  node.parentNode.removeChild(node);
  target.appendChild(node);
}

const savedConfig = JSON.parse(loadStuff() || null);
const updatedConfig = {...defaultConfig, ...savedConfig}
const {
  biggerSearchResults,
  tilesForBigScreen,
  responsiveScriptView,
  prettyPrintExportButtons,
  openScriptButton,
  customTheme,
  removeFooter,
  scriptSelectPlayerPriority,
} = updatedConfig;

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

    const button = document.createElement('button');
    button.type = "button";
    button.onclick = prettyExportJSON;
    button.innerText = "Pretty Export";

    const container = document.createElement('div');
    container.className = "wrap"
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

    const button = document.createElement('button');
    button.type = "button";
    button.onclick = prettyExportAudioJSON;
    button.innerText = "Pretty Export";

    const container = document.createElement('div');
    container.className = "wrap"
    container.append(button);

    exportButtons.append(container);
  }
}

if ( scriptSelectPlayerPriority.enabled ) {

  var scriptSelect = one('#script-select');

  const label = document.createElement('li', {
    className: "label",
    innerText: "Player"
  });

  const player = document.createElement('li', {
    innerText: "player"
  });
  player.setAttribute("data-value", "1");

  scriptSelect.prepend(player)
  scriptSelect.prepend(label)
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

  const button = document.createElement('button');
  button.type = "button";
  button.id = "go-to-script";
  button.onclick = openScript;
  button.innerText = "Open script";

  scriptModifiers.append(button);
}

function addSettingsContainer() {
  function saveSettings() {
    try {
      var configInput = document.getElementById('config').value;
      var jsonConfig = JSON.parse(configInput);
      saveStuff(jsonConfig);
      alert("Settings have been saved! Don't forget to refresh the page.");
    } catch {
      alert("An error occured! check your json");
    }
  }

  function resetSettings() {
    try {
      saveStuff(defaultConfig);
      alert("Settings have been reset! Don't forget to refresh the page.");
    } catch {
      alert("An error occured! check your json");
    }
  }

  const settingsContainer = document.createElement('div');
  settingsContainer.id = "settings-container";
  settingsContainer.className = "hidden";
  settingsContainer.style = "box-shadow: 0 0 0 1px var(--ui-color-primary), 0 0 0 3px var(--ui-color-key); padding: 1rem; background-color: #b1aea8; position: fixed; top: 50%; left: 50%; width: 500px; transform: translate(-50%, -50%); z-index: 9999;"

  const settingstextArea = document.createElement('textarea');
  settingstextArea.id = "config";
  settingstextArea.style = "width: 100%; height: 400px; margin-bottom: 1rem;";
  settingstextArea.value = "config bla";

  const saveSettingsButton = document.createElement('button');
  saveSettingsButton.type = "button";
  saveSettingsButton.onclick = saveSettings;
  saveSettingsButton.innerText = "Save";

  const resetSettingsButton = document.createElement('button');
  resetSettingsButton.type = "button";
  resetSettingsButton.onclick = resetSettings;
  resetSettingsButton.innerText = "Reset";

  const closeSettingsButton = document.createElement('button');
  closeSettingsButton.type = "button";
  closeSettingsButton.onclick = toggleSettingsContainer;
  closeSettingsButton.innerText = "Close";

  settingsContainer.appendChild(settingstextArea)
  settingsContainer.appendChild(saveSettingsButton)
  settingsContainer.appendChild(resetSettingsButton)
  settingsContainer.appendChild(closeSettingsButton)

  document.getElementById('main').appendChild(settingsContainer);

// Retrieve your data from locaStorage OR grab default config
  const saveData = JSON.parse(loadStuff() || null) || defaultConfig;

  const configInput = document.getElementById('config')
  configInput.value = JSON.stringify(saveData, null, 2);
}

const styles = '#settings-container.hidden { display: none; }';

addStyle(styles);
addSettingsContainer();

const saveSettingsButton = document.createElement('button');
saveSettingsButton.type = "button";
saveSettingsButton.onclick = toggleSettingsContainer;
saveSettingsButton.innerText = "Pulp+ Settings";

const settingsButtonContainer = document.createElement('div');
settingsButtonContainer.className = "wrap"
settingsButtonContainer.append(saveSettingsButton);

const editorPane = document.getElementById('editor-pane');
editorPane.append(settingsButtonContainer);

function toggleSettingsContainer() {
  const exportButtons = document.getElementById('settings-container');
  exportButtons.className = exportButtons.className === "hidden" ? "": "hidden"
}
