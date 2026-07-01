import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";
import { Grid } from "@mui/material";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days. Express options are available at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer free returns within 30 days of delivery, no questions asked.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and times vary by destination.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking link by email.",
  },
  {
    question: "What sizes do you offer?",
    answer:
      "Our socks come in three sizes — small, medium, and large — covering roughly EU 35 to 46. Each product page has a full size chart.",
  },
  {
    question: "What are the socks made from?",
    answer:
      "Most of our socks are a combed-cotton blend with a little elastane for stretch and shape retention. Exact composition is listed on each product.",
  },
  {
    question: "How should I care for my socks?",
    answer:
      "Machine wash cold, inside out, and tumble dry low or air dry. Skipping high heat keeps the colours and elastic lasting longer.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes — you can add gift wrapping at checkout, and we'll include a personalised note if you'd like.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
  return (
    <Box
      component="section"
      aria-labelledby="faq-heading"
      sx={{ pt: 6, pb: 12 }}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h2"
          id="faq-heading"
          sx={{ mb: 3, fontWeight: 500 }}
        >
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {faqs.map((faq) => (
            <Grid key={faq.question} size={{ xs: 12, md: 6 }}>
              <Accordion
                disableGutters
                sx={{
                  bgcolor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px !important",
                  "&:before": { display: "none" },
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ py: 1, m: 0 }}
                >
                  <Typography
                    component="h3"
                    sx={{ fontWeight: 600, fontSize: "1.1rem" }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ borderTop: "1px solid", borderColor: "divider", py: 2 }}
                >
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
