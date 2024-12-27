import {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import type {Game, Player} from "../types";
import {usePlayerHistory} from "../db/selectors";
import {playerPalette} from "../tools/playerPalette";
import {addPlayerScore, deletePlayerLastScore} from "../db/actions";

type PlayerCardProps = {
    game: Game;
    player: Player;
    index: number;
}

const SAVE_TIMEOUT = 2_000;

export default function PlayerCard({game, player, index}: PlayerCardProps) {
    const playerHistory = usePlayerHistory(game.id, player.id);

    // Score
    const [newScore, setNewScore] = useState(0);
    const [saveTimeout, setSaveTimeout] = useState<ReturnType<typeof setInterval> | null>(null);

    const handleScoreChange = (delta: number) => {
        setNewScore(newScore + delta);
        saveTimeout && clearTimeout(saveTimeout);
        setSaveTimeout(setTimeout(() => handleScoreSave, SAVE_TIMEOUT))
    }

    const handleScoreSave = async () => {
        await addPlayerScore(game.id, player.id, newScore);
        handleScoreCancel();
    }

    const handleScoreCancel = () => {
        saveTimeout && clearTimeout(saveTimeout);
        setNewScore(0);
    }

    const handleScoreAddZero = async () => {
        await addPlayerScore(game.id, player.id, 0);
        handleScoreEditClose();
    }

    const handleScoreUndoLast = async () => {
        await deletePlayerLastScore(game.id, player.id);
        handleScoreEditClose();
    }


    // Menu
    const [scoreMenuAnchorEl, setScoreMenuAnchorEl] = useState<null | HTMLElement>(null);
    const scoreMenuOpen = Boolean(scoreMenuAnchorEl);
    const handleScoreEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setScoreMenuAnchorEl(event.currentTarget);
    };
    const handleScoreEditClose = () => {
        setScoreMenuAnchorEl(null);
    };

    // Render
    return (
        <Card sx={{bgcolor: playerPalette[index]}}>
            <CardHeader
                title={player.name}
                action={<Chip label={playerHistory?.length ?? 0}/>}
            />
            <CardContent>
                <Stack spacing={1} alignItems="space-between">
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => handleScoreChange(-1)}>-1</Button>
                        <Button variant="contained" onClick={() => handleScoreChange(-5)}>-5</Button>
                        <Button variant="contained" onClick={() => handleScoreChange(-10)}>-10</Button>
                    </Stack>
                    <Box sx={{position: 'relative'}}>
                        <Button
                            id="score-edit-button"
                            aria-controls={scoreMenuOpen ? 'score-edit-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={scoreMenuOpen ? 'true' : undefined}
                            onClick={handleScoreEditClick}
                        >
                            <Typography variant="h2">{player.score}</Typography>
                        </Button>
                        <Menu
                            id="score-edit-menu"
                            anchorEl={scoreMenuAnchorEl}
                            open={scoreMenuOpen}
                            onClose={handleScoreEditClose}
                            MenuListProps={{
                                'aria-labelledby': 'score-edit-button',
                            }}
                        >
                            <MenuItem onClick={handleScoreAddZero}>Add zero</MenuItem>
                            <MenuItem onClick={handleScoreUndoLast}>Undo last</MenuItem>
                        </Menu>
                        {newScore !== 0 ? (
                            <Stack direction="row" sx={{position: 'absolute', inset: 0}}>
                                <IconButton onClick={handleScoreCancel}>
                                    <ClearIcon/>
                                </IconButton>
                                <Typography variant="h3">{newScore}</Typography>
                                <IconButton onClick={handleScoreSave}>
                                    <CheckIcon/>
                                </IconButton>
                            </Stack>
                        ) : null}
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => handleScoreChange(+1)}>+1</Button>
                        <Button variant="contained" onClick={() => handleScoreChange(+5)}>+5</Button>
                        <Button variant="contained" onClick={() => handleScoreChange(+10)}>+10</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
};