{
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