{
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