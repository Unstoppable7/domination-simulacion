import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function BuildProgressBar({
  setBuildProgress,
  id,
  setShowProgressBar,
  buildTime = 500,
  setCurrentAmountVillagers,
}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, buildTime);

    return () => {
      clearInterval(timer);
    };
  }, [buildTime]);

  React.useEffect(() => {
    setBuildProgress({
      id,
      progress: progress,
    });

    if (progress === 100) {
      setShowProgressBar({
        townId: null,
        open: false,
      });

      setCurrentAmountVillagers(5);

      setBuildProgress({
        id: null,
      });
    }
  }, [id, progress, setBuildProgress, setShowProgressBar]);

  return (
    <Box sx={{ width: "200px" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
