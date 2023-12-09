import { Box, Container, Grid, ScrollArea, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutItem from "./CheckoutItemBox";
import CheckoutTotal from "./CheckoutTotal";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { getTime } from "../../utils/time";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, updateCart } = useContext(CartContext);
  const { userDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handlePlaceOrder() {
    setLoading(true);

    const productIds = cart.map((item) => {
      return item.product._id;
    });

    try {
      const response = await axios.post("/orders/create", {
        productIds: [...productIds],
        userId: userDetails._id,
        orderPlacedAt: getTime(),
      });
      setLoading(false);

      toast.success("Order placed successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/gallery");
      updateCart([]);
    } catch (err) {
      setLoading(false);

      toast.error("An error occured!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <Box
      sx={{
        padding: "30px 0",
      }}
    >
      <Container size={"xl"}>
        <Text
          mb={10}
          variant="text"
          sx={{
            fontSize: "30px",
          }}
        >
          Create Post Checkout
        </Text>
        <Grid gutter={"lg"}>
          <Grid.Col xs={12} md={8}>
            <ScrollArea type="scroll" h={600}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {cart?.map((item, index) => {
                  return (
                    <CheckoutItem
                      key={index}
                      imageURL={item.product.imageURL}
                      title={item.product.title}
                      description={item.product.desciption}
                      price={item.product.price}
                    />
                  );
                })}
              </Box>
            </ScrollArea>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <CheckoutTotal loading={loading} handlePlaceOrder={handlePlaceOrder} />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
