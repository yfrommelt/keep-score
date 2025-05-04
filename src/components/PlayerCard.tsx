import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";

import type { Game, Player } from "../types";
import { usePlayerHistory } from "../db/selectors";
import { playerPalette } from "../tools/playerPalette";
import { addPlayerScore, deletePlayerLastScore } from "../db/actions";
import SaveCountDown from "./score/SaveCountDown";

type PlayerCardProps = {
  game: Game;
  player: Player;
  index: number;
};

const SAVE_TIMEOUT = 2_000;

export default function PlayerCard({ game, player, index }: PlayerCardProps) {
  const playerHistory = usePlayerHistory(game.id, player.id);

  // Score
  const [scoreDelta, setScoreDelta] = useState<number | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  const handleScoreChange = (delta: number) => {
    const score = (scoreDelta || 0) + delta;
    setScoreDelta(score);
    saveTimeout && clearTimeout(saveTimeout);
    setSaveTimeout(setTimeout(() => handleScoreSave(score), SAVE_TIMEOUT));
  };

  const handleScoreSave = async (score: number) => {
    await addPlayerScore(game.id, player.id, score);
    handleScoreCancel();
  };

  const handleScoreCancel = () => {
    saveTimeout && clearTimeout(saveTimeout);
    setScoreDelta(null);
  };

  const handleScoreAddZero = async () => {
    await addPlayerScore(game.id, player.id, 0);
    handleScoreEditClose();
  };

  const handleScoreUndoLast = async () => {
    await deletePlayerLastScore(game.id, player.id);
    handleScoreEditClose();
  };

  // Menu
  const [scoreMenuAnchorEl, setScoreMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const scoreMenuOpen = Boolean(scoreMenuAnchorEl);
  const handleScoreEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setScoreMenuAnchorEl(event.currentTarget);
  };
  const handleScoreEditClose = () => {
    setScoreMenuAnchorEl(null);
  };

  // Render
  const historyTimeline = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!historyTimeline.current) {
      return;
    }
    historyTimeline.current.scrollLeft = historyTimeline.current.scrollWidth;
  }, [playerHistory]);

  return (
    <Card sx={{ bgcolor: playerPalette[index], color: "primary.contrastText" }}>
      <CardHeader
        title={player.name}
        action={
          <Chip
            label={playerHistory?.length ?? 0}
            sx={{ color: "primary.contrastText" }}
          />
        }
      />
      <CardContent>
        <Stack spacing={1} alignItems="space-between">
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => handleScoreChange(-1)}>
              -1
            </Button>
            <Button variant="contained" onClick={() => handleScoreChange(-5)}>
              -5
            </Button>
            <Button variant="contained" onClick={() => handleScoreChange(-10)}>
              -10
            </Button>
          </Stack>
          <Box sx={{ position: "relative" }}>
            {scoreDelta !== null ? (
              <Stack direction="row" alignItems="center">
                <IconButton onClick={handleScoreCancel}>
                  <ClearIcon />
                </IconButton>
                <Button>
                  <Typography variant="h3" color="primary.contrastText">{scoreDelta}</Typography>
                                </Button>
                                <Box sx={{position: 'relative'}}>
                                    <IconButton onClick={() => handleScoreSave(scoreDelta)}>
                                        <CheckIcon/>
                                    </IconButton>
                                    <SaveCountDown key={scoreDelta} duration={SAVE_TIMEOUT}/>
                                </Box>
              </Stack>
            ) : (
              <Button
                id="score-edit-button"
                aria-controls={scoreMenuOpen ? "score-edit-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={scoreMenuOpen ? "true" : undefined}
                onClick={handleScoreEditClick}
              >
                <Typography variant="h3" color="primary.contrastText">
                  {player.score}
                </Typography>
              </Button>
            )}
            <Menu
              id="score-edit-menu"
              anchorEl={scoreMenuAnchorEl}
              open={scoreMenuOpen}
              onClose={handleScoreEditClose}
              MenuListProps={{
                "aria-labelledby": "score-edit-button",
              }}
            >
              <MenuItem onClick={handleScoreAddZero}>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add zero</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleScoreUndoLast}>
                <ListItemIcon>
                  <UndoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Undo last</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => handleScoreChange(+1)}>
              +1
            </Button>
            <Button variant="contained" onClick={() => handleScoreChange(+5)}>
              +5
            </Button>
            <Button variant="contained" onClick={() => handleScoreChange(+10)}>
              +10
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ overflowX: "auto" }}
          ref={historyTimeline}
        >
          {playerHistory?.map((score, index) => (
            <Typography key={index}>{score.value}</Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}