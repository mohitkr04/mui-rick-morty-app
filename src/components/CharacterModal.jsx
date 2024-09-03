import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function CharacterModal({ character, open, onClose }) {
  if (!character) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2">
          {character.name}
        </Typography>
        <img src={character.image} alt={character.name} style={{ width: '100%', marginTop: '1rem' }} />
        <Typography sx={{ mt: 2 }}>Status: {character.status}</Typography>
        <Typography>Species: {character.species}</Typography>
        <Typography>Gender: {character.gender}</Typography>
        <Typography>Origin: {character.origin.name}</Typography>
        <Typography>Location: {character.location.name}</Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
}

export default CharacterModal;
