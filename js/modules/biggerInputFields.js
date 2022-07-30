{
  const { biggerInputFields } = loadConfig();

  if (biggerInputFields.tileName ) {
    let styles = `
      #tile-name {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        max-width: none;
      }
      
      #tile-pane .actions {
        padding: 0;
      }
    `;

    addStyle(styles);
  }

  if ( biggerInputFields.roomName ) {
    const styles = `
      #room-name {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        max-width: none;
      }
    `;

    addStyle(styles);
  }

  if ( biggerInputFields.songName ) {
    const styles = `
      #song-name {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        max-width: none;
      }
    `;

    addStyle(styles);
  }

  if ( biggerInputFields.soundName ) {
    const styles = `
      #sound-name {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        max-width: none;
      }
    `;

    addStyle(styles);
  }
}