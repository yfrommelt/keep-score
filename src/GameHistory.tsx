import {Container, Fab, Typography} from "@mui/material";
import {Link} from "react-router";
import {useGameHistory} from "./db/selectors";
import GameCard from "./components/GameCard";
import {Masonry} from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';

export default function GameHistory() {
    const games = useGameHistory();

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                Game History
            </Typography>

            <Masonry columns={{xs: 2, sm: 3}} spacing={2}>
                {games?.map(game => <GameCard game={game} key={game.id}/>)}
            </Masonry>

            <Fab component={Link} to="/game/new"
                 color="primary" aria-label="New game"
                 sx={(theme) => ({
                     position: 'fixed',
                     bottom: theme.spacing(1),
                     right: theme.spacing(1)
                 })}>
                <AddIcon/>
            </Fab>
        </Container>
    );
}
