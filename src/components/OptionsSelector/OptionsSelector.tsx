import { ConfigOption } from "@/types/productDetail";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

type Props = {
  option: ConfigOption;
  selectedUid?: string;
  onSelect: (valueUid: string) => void;
};

export default function OptionSelector({
  option,
  selectedUid,
  onSelect,
}: Props) {
  return (
    <Box>
      <Typography component="p" sx={{ mb: 1, fontWeight: 600 }}>
        {option.label}
      </Typography>
      <ToggleButtonGroup
        value={selectedUid ?? null}
        exclusive
        onChange={(_, value) => {
          if (value) onSelect(value);
        }}
        aria-label={option.label}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {option.values.map((v) => (
          <ToggleButton
            key={v.uid}
            value={v.uid}
            sx={{
              color: "#fff",
              borderRadius: "4px !important",
              border: "1px solid #444 !important",
              px: 2,
              "&.Mui-selected": {
                bgcolor: "#fff",
                color: "#000",
                "&:hover": { bgcolor: "#eee" },
              },
            }}
          >
            {v.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
