{
  const tilesContainer = document.getElementById("room-pane").getElementsByClassName('row')[0];
  tilesContainer.id = "tiles-container";
  document.getElementById("layers").style.width = '100%';
  document.getElementById("layers").style.maxWidth = '640px';

  const { betterTiles } = loadConfig();

  if ( betterTiles.desktopMode ) {
    document.getElementById("mode-room").appendChild(tilesContainer);

    const styles = `
      #tiles-container { 
        padding: 8px 32px; 
      }
  `;

    addStyle(styles);
  }

  if ( betterTiles.lockedTilesCount ) {
    document.getElementById("room-tiles").style.maxWidth = 'calc(32px*' + betterTiles.lockedTilesCount + ")";
  } else if ( betterTiles.responsive ) {
    document.getElementById("room-tiles").style.maxWidth = '100%';
  }

  if (betterTiles.scrollbar) {
    let styles = `
      #tiles-container { 
        height:  calc(100vh - 680px);
        overflow-y: scroll; 
      }
    `;

    if (betterTiles.desktopMode) {
      styles = `
        #tiles-container { 
          height: calc(100vh - 80px); 
          overflow-y: scroll; 
        }
      `;
    }
   
    addStyle(styles); 
  }

  if (betterTiles.layersGrid ) {
    let styles = `
      #layers { 
        display: grid;
        grid-template-areas: "1fr 1fr 1fr";
        grid-gap: 0.5rem; 
      }
    `;

    addStyle(styles);
  }

  if ( betterTiles.layersAboveTiles ) {
    const styles = `
      #tiles-container .export-import { position: relative; }
      #tiles-container .layer-info { width: 100%; }
      #tiles-container { flex-direction: column; }
      #tiles-container .col { margin-left: 0; }
    `;

    addStyle(styles);
  }
}