function saveConfig(saveData) {
  const savedConfig = JSON.parse(localStorage.pulpPlus || null);
  localStorage.pulpPlus = JSON.stringify({...saveData, defaultConfig: savedConfig.defaultConfig});
}

function loadConfig() {
  return JSON.parse(localStorage.pulpPlus);
}

function resetConfig() {
  const savedConfig = JSON.parse(localStorage.pulpPlus || null);
  localStorage.pulpPlus = JSON.stringify({...savedConfig.defaultConfig, defaultConfig: savedConfig.defaultConfig});
}

function addExternalScript(url) {
  const script = createElement('script', {
    src: url
  });

  document.head.appendChild(script)
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
      resetConfig();
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
