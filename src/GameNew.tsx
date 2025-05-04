import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { createGame } from "./db/actions";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePlayers } from "./db/selectors";
import { playerPalette } from "./tools/playerPalette";
import SharedAppBar from "./components/SharedAppBar";

export default function GameNew() {
  const navigate = useNavigate();
  const existingPlayers = usePlayers();

  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>([
    "Player 1",
    "Player 2",
  ]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Update player names when player count changes
  useEffect(() => {
    const newPlayerNames = [...playerNames];

    // Add new players if needed
    while (newPlayerNames.length < playerCount) {
      newPlayerNames.push(`Player ${newPlayerNames.length + 1}`);
    }

    // Remove extra players if needed
    while (newPlayerNames.length > playerCount) {
      newPlayerNames.pop();
    }

    setPlayerNames(newPlayerNames);
  }, [playerCount]);

  // Handle player count change
  const handlePlayerCountChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCount: number | null | string,
  ) => {
    if (newCount !== null) {
      if (newCount === "more") {
        setModalOpen(true);
      } else {
        setPlayerCount(newCount as number);
      }
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle player count selection from modal
  const handlePlayerCountSelect = (count: number) => {
    setPlayerCount(count);
    setModalOpen(false);
  };

  // Handle player name change
  const handlePlayerNameChange = (index: number, newName: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = newName;
    setPlayerNames(newPlayerNames);
  };

  // Create game
  const handleCreateGame = async () => {
    const gameId = await createGame(playerNames);
    navigate(`/game/${gameId}`);
  };

  // Generate number buttons from 2 to 8 (toggle buttons for common player counts)
  const playerCountButtons = [];
  for (let i = 2; i <= 8; i++) {
    playerCountButtons.push(
      <ToggleButton key={i} value={i}>
        {i}
      </ToggleButton>,
    );
  }
  // Add the "+" button
  playerCountButtons.push(
    <ToggleButton key="more" value="more">
      +
    </ToggleButton>,
  );

  return (
    <>
      <SharedAppBar title="New Game" showBackButton backTo="/" />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Number of Players
          </Typography>
          <ToggleButtonGroup
            value={playerCount}
            exclusive
            onChange={handlePlayerCountChange}
            aria-label="number of players"
          >
            {playerCountButtons}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Player Names
          </Typography>
          <Grid container spacing={2}>
            {playerNames.map((name, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Autocomplete
                  freeSolo
                  options={(
                    existingPlayers?.map((player) => player.name) || []
                  ).filter((name) => !name.match(/^Player \d+$/))}
                  value={name}
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      handlePlayerNameChange(index, newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Player ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      className="colored"
                      onChange={(e) =>
                        handlePlayerNameChange(index, e.target.value)
                      }
                      sx={{
                        bgcolor: playerPalette[index],
                      }}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={handleCreateGame}
          disabled={playerNames.some((name) => !name.trim())}
        >
          Create Game
        </Button>
      </Container>

      {/* Player Count Selection Modal */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Select Number of Players</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Array.from({ length: 12 }, (_, i) => i + 9).map((count) => (
              <Grid size={4} key={count}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handlePlayerCountSelect(count)}
                >
                  {count}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
