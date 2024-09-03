import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function CharacterCard({ character, onClick }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={character.image}
        alt={character.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {character.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: {character.species}
        </Typography>
      </CardContent>
      <Button size="small" onClick={() => onClick(character)}>Learn More</Button>
    </Card>
  );
}

export default CharacterCard;
