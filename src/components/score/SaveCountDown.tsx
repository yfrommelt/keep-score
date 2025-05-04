import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

type SaveCountDownProps = {
  duration: number;
};

export default function SaveCountDown({ duration }: SaveCountDownProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(
        (prevProgress) => (prevProgress + 100 / (duration / 100)) % 100,
      );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <CircularProgress
      variant="determinate"
      value={progress}
      size={40}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
