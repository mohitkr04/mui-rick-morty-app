import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress, Alert, CssBaseline, TextField, InputAdornment, IconButton, Typography, Button } from '@mui/material';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getCharacters, searchCharacters } from './services/api';
import ThemeToggle from './components/ThemeToggle';
import './App.css'; // Import the CSS file
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#0a192f' : '#f5f5f5',
        paper: darkMode ? '#1a2c4e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#64ffda' : '#333333',
        secondary: darkMode ? '#8892b0' : '#666666',
      },
    },
  });

  useEffect(() => {
    loadInitialCharacters();
  }, []);

  const loadInitialCharacters = () => {
    setLoading(true);
    setError(null);
    getCharacters()
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const data = await searchCharacters(searchTerm);
      setCharacters(data.results);
      setIsSearchResult(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSearching(false);
    }
  };

  const handleBackToMain = () => {
    setSearchTerm("");
    setIsSearchResult(false);
    loadInitialCharacters();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>
          Rick and Morty Characters
        </Typography>
        
        <TextField
          variant="outlined"
          placeholder="Search characters"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} edge="end" disabled={searching}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, width: '100%' }}
        />

        {isSearchResult && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToMain}
            sx={{ mb: 2 }}
          >
            Back to Main Page
          </Button>
        )}

        <div className="theme-toggle">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        {(loading || searching) && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {characters.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <CharacterCard character={character} onClick={handleCharacterClick} />
            </Grid>
          ))}
        </Grid>
        <CharacterModal
          character={selectedCharacter}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
