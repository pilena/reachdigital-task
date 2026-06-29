import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { useCart, setQty, removeFromCart } from "@/lib/cart";
import QuantitySelector from "../QtySelector/QtySelector";

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, count, subtotal, currency } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: 320, sm: 380 },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        role="region"
        aria-label="Shopping cart"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Your Cart ({count})
          </Typography>
          <IconButton aria-label="Close cart" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {items.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Typography sx={{ color: "#888" }}>Your cart is empty.</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
              <Stack divider={<Divider />}>
                {items.map((item) => (
                  <Box
                    key={item.uid}
                    sx={{
                      py: 2,
                      display: "flex",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                        {formatPrice(item.price, item.currency)}
                      </Typography>
                      <QuantitySelector
                        value={item.qty}
                        onChange={(n) => setQty(item.uid, n)}
                      />
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatPrice(item.price * item.qty, item.currency)}
                      </Typography>
                      <IconButton
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.uid)}
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography sx={{ fontWeight: 600 }}>Subtotal</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {formatPrice(subtotal, currency)}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  "&:hover": { bgcolor: "#ddd" },
                }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
