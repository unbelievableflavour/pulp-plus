{
  const projects = [
      { name: 'Fade-in & Fade-out', url:'https://devforum.play.date/t/how-to-do-a-fade-in-or-fade-out-in-pulp/7892'},
      { name: 'Rain effect', url: 'https://devforum.play.date/t/rain-effect-in-pulp/6919'},
      { name: 'Multi-tile Animations', url: 'https://devforum.play.date/t/aseprite-script-export-multi-tile-animations-to-pulp/4080'},
      { name: 'Two-tile-tall Player', url: 'https://devforum.play.date/t/pulp-how-to-two-tile-tall-player/1716/13'},
      { name: 'Path Generator', url: 'https://devforum.play.date/t/dynamic-path-generator/4432'},
      { name: 'Transitions', url: 'https://devforum.play.date/t/transitions-example-project/4593'},
      { name: 'Platformer', url: 'https://devforum.play.date/t/pulp-simple-platformer-example/4327'}
  ];

  const titleLabel = createElement('h2', {
    innerText: "Example Projects"
  });

  const container = createElement('div', {
    id: "example-project-pane",
    className: "pane example-project-pane",
  });

  const list = createElement('ul', {});

  projects.forEach((project)=>{
    const listItem = createElement('li', {
    })
    const button = createElement('a', {
      type: "button",
      className: "project-button",
      target: "_blank",
      href: project.url,
      innerText: project.name
    });
    listItem.appendChild(button);
    list.appendChild(listItem);
  })

  container.appendChild(titleLabel);
  container.appendChild(list);

  one('#mode-game').appendChild(container);

  const styles = `
    #example-project-pane {
      width: 100%;
      padding-left: 0;
    }
    
    #example-project-pane h2 {
      margin-bottom: 1.5rem;
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