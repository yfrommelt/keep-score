import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDate } from "../tools/format";
import { playerPalette } from "../tools/playerPalette";
import { Link } from "react-router";
import { Game } from "../types";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/game/${game.id}`}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={game.name || formatDate(game.createdAt)}
          subheader={game.name ? formatDate(game.createdAt) : ""}
        />
        <CardContent>
          <List disablePadding>
            {game.players.map((player, index) => (
              <ListItem key={player.id} disableGutters>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: playerPalette[index] }}>
                    {player.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={player.name} />
                <Typography>{player.score}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
