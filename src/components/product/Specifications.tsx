import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

type SpecRow = { label: string; value: string };

export default function Specifications({ rows }: { rows: SpecRow[] }) {
  if (rows.length === 0) return null;

  return (
    <Box component="section" aria-labelledby="specs-heading" sx={{ mt: 6 }}>
      <Typography id="specs-heading" variant="h2" sx={{ fontSize: 24, mb: 2 }}>
        Specifications
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.label}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontWeight: 600,
                  width: "40%",
                  borderColor: "#333",
                  color: "#fff",
                }}
              >
                {r.label}
              </TableCell>
              <TableCell sx={{ borderColor: "#333", color: "#ccc" }}>
                {r.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
