import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";

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
    <Box component="section" aria-labelledby="faq-heading" sx={{ py: 6 }}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          id="faq-heading"
          sx={{ mb: 3, fontWeight: 700 }}
        >
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq) => (
          <Accordion key={faq.question}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h3" sx={{ fontWeight: 600 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
