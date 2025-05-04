import { AppBar, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useGameDashboard } from "./db/selectors";
import { Link, useParams } from "react-router-dom";
import PlayerCard from "./components/PlayerCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GameDashboard() {
  const { id } = useParams();
  const game = useGameDashboard(Number(id));

  console.log("🍺🍺🍺", { game });

  if (!game) {
    return;
  }

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h1">
            Game Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {game.players.map((player, index) => (
            <Grid size={6} key={player.id}>
              <PlayerCard game={game} player={player} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
