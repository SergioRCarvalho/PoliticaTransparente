import { createTheme } from '@mui/material';
import { red, blue } from '@mui/material/colors/';

const primaryColor = red[600];
const secondaryColor = blue[600];

const customtheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

export default customtheme
