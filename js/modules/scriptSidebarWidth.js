{
  const { scriptSidebarWidth } = loadConfig();

  const styles = `
    #script-select {
      height: auto;
      box-sizing: border-box;
      max-width: ${scriptSidebarWidth.maxWidth};
    }
    #recent-list li {
      max-width: ${scriptSidebarWidth.maxWidth};
    }
  `;

  addStyle(styles);

  var scriptSelect = one('#script-select');

  scriptSelect.style.width = scriptSidebarWidth.maxWidth;
  function scriptSelectPlayerPriorityCallback(mutations) {
    if ( scriptSelect.style.width === scriptSidebarWidth.maxWidth ) {
      return;
    }

    scriptSelect.style.width = scriptSidebarWidth.maxWidth;
  }

  let observer = new MutationObserver(scriptSelectPlayerPriorityCallback);
  observer.observe(scriptSelect, {
    childList: true,
  });
}