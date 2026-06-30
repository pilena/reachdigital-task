import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function StatementSection() {
  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          component="p"
          sx={{
            color: "#fff",
            fontSize: 24,
            lineHeight: 1.6,
            fontWeight: 600,
            textAlign: "center",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            textTransform: "uppercase",
          }}
        >
          Whether you&apos;re looking for something stylish for a night time
          party with friends or something professional for a conference call in
          the boardroom, GraphCommerce has you covered with socks that are both
          comfortable and versatile. So why settle for boring and plain socks
          when you can upgrade your footwear game?
        </Typography>
      </Container>
    </Box>
  );
}
