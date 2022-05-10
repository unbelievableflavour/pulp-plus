
function saveStuff(saveData) {
  localStorage.pulpPlus = JSON.stringify(saveData);
}

function loadStuff() {
  return localStorage.pulpPlus;
}

const defaultConfig = {
  biggerSearchResults: true,
  prettyPrintExportProjectButton: true,
  tilesForBigScreen: true,
  responsiveScriptView: true,
  prettyPrintExportSoundButton: true
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

const savedConfig = JSON.parse(loadStuff() || {});
const updatedConfig = {...defaultConfig, ...savedConfig}
const { biggerSearchResults, tilesForBigScreen, prettyPrintExportProjectButton, responsiveScriptView, prettyPrintExportSoundButton } = updatedConfig;

if (biggerSearchResults) {
  let styles = '#search-wrap #results-list { width: 600px;}';
  styles += '#search-wrap #results-list li:not(.label), #select-options { max-width: 100%; }';

  addStyle(styles);
}

if( responsiveScriptView ) {
  let styles = '#mode-script { width: 100%; }';
  styles += '#game-pane, #script-pane { width: 100%; }';

  addStyle(styles);
}

if (tilesForBigScreen) {

  let styles = '#tiles-container { padding: 8px 32px; }';
  styles += '#tiles-container .export-import { position: relative; }';
  styles += '#tiles-container .layer-info { width: 100%; }';

  styles += '#tiles-container { flex-direction: column; }';
  styles += '#tiles-container .col { margin-left: 0; }';

  addStyle(styles);

  const tilesContainer = document.getElementById("room-pane").getElementsByClassName('row')[0];
  tilesContainer.id = "tiles-container";

  document.getElementById("mode-room").appendChild(tilesContainer);

  // Responsiveness hack
  document.getElementById("room-tiles").style.maxWidth = '100%';
  document.getElementById("layers").style.width = '100%';
}

if (prettyPrintExportProjectButton) {

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

if (prettyPrintExportSoundButton) {

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
  saveSettingsButton.innerText = "Save settings";

  const resetSettingsButton = document.createElement('button');
  resetSettingsButton.type = "button";
  resetSettingsButton.onclick = resetSettings;
  resetSettingsButton.innerText = "Reset settings";

  settingsContainer.appendChild(settingstextArea)
  settingsContainer.appendChild(saveSettingsButton)
  settingsContainer.appendChild(resetSettingsButton)

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
saveSettingsButton.appendChild(document.createTextNode("Pulp+ Settings"));

const settingsButtonContainer = document.createElement('div');
settingsButtonContainer.className = "wrap"
settingsButtonContainer.append(saveSettingsButton);

const editorPane = document.getElementById('editor-pane');
editorPane.append(settingsButtonContainer);

function toggleSettingsContainer() {
  const exportButtons = document.getElementById('settings-container');
  exportButtons.className = exportButtons.className === "hidden" ? "": "hidden"
}
