{
  addExternalScript("https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js");

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