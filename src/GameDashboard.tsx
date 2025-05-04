import { Container, Grid } from "@mui/material";
import { useGameDashboard } from "./db/selectors";
import { useParams } from "react-router-dom";
import PlayerCard from "./components/PlayerCard";
import SharedAppBar from "./components/SharedAppBar";

export default function GameDashboard() {
  const { id } = useParams();
  const game = useGameDashboard(Number(id));

  console.log("🍺🍺🍺", { game });

  if (!game) {
    return;
  }

  return (
    <>
      <SharedAppBar title="Game Dashboard" showBackButton backTo="/" />

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
