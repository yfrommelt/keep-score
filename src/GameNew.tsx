import {Button, Container, Typography} from "@mui/material";
import {createGame} from "./db/actions";

export default function GameNew() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                New Game
            </Typography>

            <Button variant="contained" onClick={async () => {
                await createGame(['Lolo', 'Yoyo']);
                console.log('🍺🍺🍺 Game created');
            }}>
                TestDb
            </Button>
        </Container>
    );
}
