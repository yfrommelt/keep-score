import {Button, Container, Typography} from "@mui/material";
import {createGame} from "./db/actions";
import {useNavigate} from "react-router";

export default function GameNew() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{mb: 2}}>
                New Game
            </Typography>

            <Button variant="contained" onClick={async () => {
                const gameId = await createGame(['Lolo', 'Yoyo']);
                navigate(`/game/${gameId}`);
            }}>
                TestDb
            </Button>
        </Container>
    );
}
