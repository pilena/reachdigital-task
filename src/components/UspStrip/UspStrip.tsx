import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const usps = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: ReplayOutlinedIcon,
    title: "30-Day Returns",
    description: "Easy returns, no questions asked",
  },
  {
    icon: LockOutlinedIcon,
    title: "Secure Checkout",
    description: "Your data is always protected",
  },
  {
    icon: SupportAgentOutlinedIcon,
    title: "24/7 Support",
    description: "We're here to help, anytime",
  },
];

export default function UspStrip() {
  return (
    <Box component="section" aria-label="Why shop with us" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
          }}
        >
          {usps.map(({ icon: Icon, title, description }) => (
            <Stack
              key={title}
              direction="row"
              spacing={2}
              sx={{
                flex: 1,
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Icon fontSize="large" />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
