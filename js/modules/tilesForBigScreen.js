{
  const { tilesForBigScreen } = loadConfig();

  const styles = `
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
        grid-gap: 0.5rem; 
      }
    `;

    addStyle(styles);
  }
}