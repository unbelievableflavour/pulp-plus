{
  const { prettyPrintExportButtons } = loadConfig();

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