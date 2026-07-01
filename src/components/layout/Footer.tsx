import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

const customerServiceLinks = [
  { label: "Order", href: "https://reachdigital-task.vercel.app/" },
  { label: "Brand/Sizes", href: "https://reachdigital-task.vercel.app/" },
  { label: "Newsletter", href: "https://reachdigital-task.vercel.app/" },
  {
    label: "Payment Information",
    href: "https://reachdigital-task.vercel.app/",
  },
  { label: "Returns", href: "https://reachdigital-task.vercel.app/" },
  { label: "Shipping", href: "https://reachdigital-task.vercel.app/" },
];

const aboutLinks = [
  { label: "Contact", href: "https://reachdigital-task.vercel.app/" },
  { label: "Careers", href: "https://reachdigital-task.vercel.app/" },
  { label: "About Us", href: "https://reachdigital-task.vercel.app/" },
  { label: "Loyalty program", href: "https://reachdigital-task.vercel.app/" },
  {
    label: "Corporate responsibility",
    href: "https://reachdigital-task.vercel.app/",
  },
];

const bottomLinks = [
  {
    label: "Terms and conditions",
    href: "https://reachdigital-task.vercel.app/",
  },
  { label: "Credits", href: "https://reachdigital-task.vercel.app/" },
  { label: "Subscribe", href: "https://reachdigital-task.vercel.app/" },
  { label: "Remove account", href: "https://reachdigital-task.vercel.app/" },
  { label: "Newsletter", href: "https://reachdigital-task.vercel.app/" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com/", icon: TwitterIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: InstagramIcon,
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "common.black", color: "common.white", pt: 6, pb: 3 }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 6 }}
          sx={{ mb: 4 }}
        >
          <Typography sx={{ fontWeight: 600, minWidth: 140 }}>
            Customer service
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 4 }}
          >
            {customerServiceLinks.map((link) => (
              <Link key={link.label} component={NextLink} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 6 }}
          sx={{ mb: 4 }}
        >
          <Typography sx={{ fontWeight: 600, minWidth: 140 }}>
            About Us
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 4 }}
          >
            {aboutLinks.map((link) => (
              <Link key={link.label} component={NextLink} href={link.href}>
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "grey.800", mb: 3 }} />

        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
        >
          <Stack direction="row" spacing={1}>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <IconButton
                key={label}
                aria-label={label}
                component={Link}
                href={href}
                sx={{ color: "common.white" }}
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <LanguageIcon fontSize="small" />
            <Typography variant="body2">US</Typography>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              gap: { xs: 1, sm: 3 },
            }}
          >
            <Typography variant="body2">© GraphCommerce</Typography>
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                component={NextLink}
                href={link.href}
                sx={{ fontSize: "0.875rem", marginLeft: "0px!important" }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          <Button
            variant="outlined"
            sx={{
              color: "common.white",
              borderColor: "grey.700",
              borderRadius: 999,
              textTransform: "none",
            }}
          >
            Customer Service
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
