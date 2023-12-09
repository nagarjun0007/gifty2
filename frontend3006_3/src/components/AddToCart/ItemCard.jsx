import { ActionIcon, Box, Flex, Image, Paper, Text } from "@mantine/core";
import { QuantityCounter } from "./QuantityCounter";
import { IconTrash } from "@tabler/icons-react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const ItemCard = ({ title, price, image, id }) => {
  const { cart, updateCart } = useContext(CartContext);

  function handleRemoveItemFromCart(id) {
    let tempArr = cart;
    tempArr.splice(id, 1);
    updateCart([...tempArr]);
  }

  return (
    <Paper
      withBorder
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 16px",
        border: "1px solid gray",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Image width={200} height={100} radius={"md"} src={image} />
        <Flex direction={"column"} px={10}>
          <Text>{title}</Text>
          <Text>${price}</Text>
        </Flex>
      </Box>
      <Box
        sx={{
          alignSelf: "flex-end",
          display: "flex",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            maxWidth: "100px",
          }}
        >
          {/* <QuantityCounter totalSum={totalSum} setTotalSum={setTotalSum} id={id} /> */}
        </Box>
        <ActionIcon
          onClick={() => {
            handleRemoveItemFromCart(id);
          }}
          color="red"
          variant="filled"
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Box>
    </Paper>
  );
};
