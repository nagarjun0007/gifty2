import { Box, Button, Flex, Paper, Text, Loader } from "@mantine/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";

export default function CheckoutTotal({ numberOfItems, loading, handlePlaceOrder }) {
  const { cart } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  const sumOfAllItems = useCallback(() => {
    if (cart?.length > 0) {
      let sum = 0;
      cart?.forEach((item) => {
        sum = sum + item.product.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  useEffect(() => {
    sumOfAllItems();
  }, [sumOfAllItems]);

  return (
    <Box>
      <Paper p={25} withBorder radius={"md"}>
        <Box>
          <Text size={"xl"} mb={10} weight={"bold"}>
            Price Summary ({numberOfItems}items)
          </Text>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              {cart?.map((item, index) => {
                return (
                  <li
                    style={{
                      paddingBottom: "10px",
                    }}
                    key={index}
                  >
                    <Flex
                      sx={{
                        borderBottom: "0.0625rem solid #dee2e6",
                      }}
                      justify={"space-between"}
                    >
                      <Text>{item.product.title}</Text>
                      <Text>${item.product.price}</Text>
                    </Flex>
                  </li>
                );
              })}
              <li
                style={{
                  paddingTop: "10px 0",
                }}
              >
                <Flex justify={"space-between"}>
                  <Text size={"lg"} weight={"bold"}>
                    Total
                  </Text>
                  <Text size={"lg"} weight={"bold"}>
                    ${totalPrice}
                  </Text>
                </Flex>
              </li>
            </ul>
          </Box>
        </Box>
      </Paper>
      <Paper my={20}>
        <Button disabled={loading} onClick={handlePlaceOrder} fullWidth>
          {loading ? <Loader size={"sm"} color="white" /> : "Place order"}
        </Button>
      </Paper>
    </Box>
  );
}
