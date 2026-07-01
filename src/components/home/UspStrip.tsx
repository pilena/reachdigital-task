import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const usps = [
  {
    icon: PaymentsOutlinedIcon,
    title: "Free shipping over $50",
    description: "Delivered in 3-5 days",
  },
  {
    icon: ReplayOutlinedIcon,
    title: "30-day returns",
    description: "Didn't fit? Send them back free",
  },
  {
    icon: AutoAwesomeOutlinedIcon,
    title: "Combed-cotton comfort",
    description: "Soft, breathable, built to last",
  },
  {
    icon: Inventory2OutlinedIcon,
    title: "Wash-tested colours",
    description: "No fading, no stretching out",
  },
];

export default function UspStrip() {
  return (
    <Box component="section" aria-label="Why shop with us" sx={{ py: 2 }}>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "var(--surface)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
        }}
      >
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: { xs: 3, md: 4 },
            m: 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 4, md: 3 },
            bgcolor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
          }}
        >
          {usps.map(({ icon: Icon, title, description }, i) => (
            <Box
              component="li"
              key={title}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                gap: 1.5,
                position: "relative",
                pl: { md: i === 0 ? 0 : 3 },
                "&::before": {
                  content: '""',
                  display: { xs: "none", md: i === 0 ? "none" : "block" },
                  position: "absolute",
                  left: 0,
                  top: 4,
                  bottom: 4,
                  width: "1px",
                  bgcolor: "var(--border)",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "var(--primary-soft)",
                  color: "var(--primary)",
                }}
              >
                <Icon fontSize="medium" aria-hidden="true" />
              </Box>
              <Box>
                <Typography component="p" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
