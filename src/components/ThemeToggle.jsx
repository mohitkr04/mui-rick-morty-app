import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

function ThemeToggle({ darkMode, setDarkMode }) {
  const handleChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={handleChange} />}
      label={darkMode ? "Dark Mode" : "Light Mode"}
    />
  );
}

export default ThemeToggle;
