import { Card, CardActionArea, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGameHistory } from "./db/selectors";
import GameCard from "./components/GameCard";
import SharedAppBar from "./components/SharedAppBar";
import { Masonry } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

export default function GameHistory() {
  const games = useGameHistory();

  return (
    <>
      <SharedAppBar title="Game History" showDrawer />

      <Container maxWidth="lg">
        <Masonry columns={{ xs: 2, sm: 3 }} spacing={2}>
          <Card sx={{ minHeight: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardActionArea 
              component={Link} 
              to="/game/new"
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <AddIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body1">New Game</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {games?.map((game) => <GameCard game={game} key={game.id} />)}
        </Masonry>
      </Container>
    </>
  );
}
