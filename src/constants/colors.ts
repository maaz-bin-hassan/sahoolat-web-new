export const AppColors = {
  PRIMARY: '#007b7f',          // brand color
  SECONDARY: '#b2e3e3',        // lighter brand color
  DARK_BLACK: '#07212F',       // deep text color
  WHITE: '#ffffff',            // surfaces
  BACKGROUND: '#eef4f7',       // screen background
  GREEN: '#085308',            // success
  RED: '#FF0000',              // error
  GRAY: '#808080',             // placeholder
  ORANGE: '#FF7B00',           // alert
  YELLOW: '#FFA500',           // alert
  GRAY_DARK: '#444',           // subdued text
  textMuted: '#7D8A99',        // muted text
} as const;

export type AppColorName = keyof typeof AppColors;
export type AppColorValue = (typeof AppColors)[AppColorName];
