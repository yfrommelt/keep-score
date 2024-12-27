import {Container, Grid2 as Grid, Typography} from '@mui/material';
import {useGameDashboard} from "./db/selectors";
import {useParams} from "react-router";
import PlayerCard from "./components/PlayerCard";

export default function GameDashboard() {
    const {id} = useParams()
    const game = useGameDashboard(Number(id));

    console.log('🍺🍺🍺', {game})

    if (!game) {
        return
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                Game Dashboard
            </Typography>

            <Grid container spacing={1}>
                {game.players.map((player, index) => (
                    <Grid size={6} key={player.id}>
                        <PlayerCard game={game} player={player} index={index}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
