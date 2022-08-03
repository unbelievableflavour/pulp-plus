{
  const guides = [
    { name: 'Lists', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/lists.json'}, // UnbelievableFlavour
    { name: 'Clean Dialogs', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/clean_dialogs.json'}, // UnbelievableFlavour
    { name: 'Name Entry', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/name_entry.json'}, // GuvBubs
    { name: 'Double Click', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/double_click.json'}, // GuvBubs
    { name: 'Chaser Enemies', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/chaser_enemies.json'}, // GuvBubs
    { name: 'Enemy Showcase', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/enemy_showcase.json'},
    { name: 'Timer Loop', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/timer_loop.json'}, // Jongjungbu
    { name: 'Crane Game Demo', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/crane_game_demo.json'},
    { name: 'Fade-in & Fade-out', url:'https://devforum.play.date/t/how-to-do-a-fade-in-or-fade-out-in-pulp/7892'}, // NickSR
    { name: 'Rain effect', url: 'https://devforum.play.date/t/rain-effect-in-pulp/6919'}, // UndeadOctopus
    { name: 'Multi-tile Animations', url: 'https://devforum.play.date/t/aseprite-script-export-multi-tile-animations-to-pulp/4080'}, // Kleist
    { name: 'Two-tile-tall Player', url: 'https://devforum.play.date/t/pulp-how-to-two-tile-tall-player/1716/13'}, // Neven
    { name: 'Path Generator', url: 'https://devforum.play.date/t/dynamic-path-generator/4432'}, // UnbelievableFlavour
    { name: 'Transitions', url: 'https://devforum.play.date/t/transitions-example-project/4593'}, // UnbelievableFlavour
    { name: 'Platformer', url: 'https://devforum.play.date/t/pulp-simple-platformer-example/4327'}, // UnbelievableFlavour
  ];

  const projects = [
    { name: 'Pulpmon', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/pulpmon.json'}, // UnbelievableFlavour
    { name: 'Space Troubles', url: 'https://github.com/unbelievableflavour/playdate-examples/raw/main/space_troubles.json'}, // Space Troubles
  ];

  const titleLabel = createElement('h2', {
    innerText: "Examples"
  });

  const subTitleLabel = createElement('h3', {
    innerText: "Small Guides"
  });

  const subTitleLabel2 = createElement('h3', {
    innerText: "Complete Projects"
  });

  const container = createElement('div', {
    id: "example-project-pane",
    className: "pane example-project-pane",
  });

  const introduction = createElement('p', {
    innerText: "Links to some awesome downloadable projects that show what's possible in Pulp."
  });

  const guidesList = createElement('ul', {});

  guides.forEach((project)=>{
    const listItem = createElement('li', {})
    const button = createElement('a', {
      type: "button",
      className: "project-button",
      target: "_blank",
      href: project.url,
      innerText: project.name
    });

    listItem.appendChild(button);
    guidesList.appendChild(listItem);
  })

  const projectList = createElement('ul', {});

  projects.forEach((project)=>{
    const listItem = createElement('li', {})
    const button = createElement('a', {
      type: "button",
      className: "project-button",
      target: "_blank",
      href: project.url,
      innerText: project.name
    });

    listItem.appendChild(button);
    projectList.appendChild(listItem);
  })

  container.appendChild(titleLabel);
  container.appendChild(introduction);
  container.appendChild(subTitleLabel);
  container.appendChild(guidesList);
  container.appendChild(subTitleLabel2);
  container.appendChild(projectList);

  one('#mode-game').appendChild(container);

  const styles = `
    #example-project-pane {
      width: 100%;
      height: 100vh;
      padding-left: 0;
    }
    
    #example-project-pane h2 {
      margin-bottom: 1.5rem;
    }
    
    #example-project-pane p {
      max-width: 250px;
    }
    
    #example-project-pane li {
      padding: 0;
      margin-bottom: 3px;
    }
    
    .project-button {
      width: 100%;
      display: block;
      text-decoration: none;
      color: var(--ui-color-call);
      background-color: var(--ui-color-primary);
      border-radius: 2px;
      white-space: nowrap;
      padding: 0.5rem;
      padding-left: 1rem;
    }
  `;

  addStyle(styles);
}