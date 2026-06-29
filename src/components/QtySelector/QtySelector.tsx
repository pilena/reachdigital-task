import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: Props) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #444",
        borderRadius: 1,
      }}
    >
      <IconButton
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        size="small"
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        component="span"
        aria-live="polite"
        sx={{ minWidth: 36, textAlign: "center", userSelect: "none" }}
      >
        {value}
      </Typography>
      <IconButton
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        size="small"
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
