{
  const { customTheme } = loadConfig();

  one('#theme-stylesheet').href = ""
  one('#theme-select').innerText = "Custom"

  addStyle(` 
    .theme {
    /* default */
    --ui-color-primary: ${customTheme.theme.colorPrimary}; /* text */
    --ui-color-secondary: ${customTheme.theme.colorSecondary}; /* background */
    --ui-color-tertiary: ${customTheme.theme.colorTertiary}; /* text on frame */
    --ui-color-key: ${customTheme.theme.colorKey}; /* active */
    --ui-color-call: ${customTheme.theme.colorCall}; /* interactive */
    --ui-color-void: ${customTheme.theme.colorVoid}; /* frame */
  
    --ui-color-primary-alpha-10: rgba(50,47,39,0.1);
    --ui-color-primary-alpha-20: rgba(50,47,39,0.2);
    --ui-color-primary-alpha-50: rgba(50,47,39,0.5);
    --ui-color-secondary-alpha-50: rgba(177,174,168,0.5);
    --ui-color-key-alpha-50: #d8b370; /* 50% key on #b1aea8 (specifically, not --ui-color-secondary), pre-baked */
    --ui-color-call-alpha-50: var(--ui-color-secondary-alpha-50);
  }`);
}