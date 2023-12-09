import { Box, Button, Indicator, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CartDrawer from "./Drawer";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartFloatingButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const { cart } = useContext(CartContext);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
      }}
    >
      <Indicator inline label={cart?.length} color="dark" size={30}>
        <Button onClick={open} size="lg">
          <Text
            sx={{
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Cart
          </Text>
        </Button>
      </Indicator>
      <CartDrawer cartOpened={opened} cartClose={close} />
    </Box>
  );
}
