import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';

const FullPageComponent = ({handleSelection}) => {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Who are you?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSelection('Student')}
            >
              Student
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSelection('Professor')}
            >
              Teacher
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FullPageComponent;
