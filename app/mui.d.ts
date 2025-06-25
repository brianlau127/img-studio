// This file tells TypeScript that we are adding new properties to the MUI theme.
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  // Allow us to add our custom color to the palette
  interface PaletteOptions {
    brand?: PaletteColorOptions;
  }
  interface Palette {
    brand: PaletteColorOptions;
  }
}

// Allow us to use our custom color on the Button component
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brand: true;
  }
}
