import { Button, Drawer, Flex, Paper, Text } from "@mantine/core";
import { ItemCard } from "./ItemCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer({ cartOpened, cartClose }) {
  const { cart } = useContext(CartContext);
  const [totalSum, setTotalSum] = useState(0);

  const sumOfAllItems = useCallback(() => {
    if (cart?.length > 0) {
      let sum = 0;
      cart?.forEach((item) => {
        sum = sum + item.product.price;
      });
      setTotalSum(sum);
    } else {
      setTotalSum(0);
    }
  }, [cart]);

  useEffect(() => {
    sumOfAllItems();
  });

  return (
    <>
      <Drawer
        size={"lg"}
        position="right"
        opened={cartOpened}
        onClose={cartClose}
        title={<Text size={"xl"}>Cart Items</Text>}
      >
        <Flex direction={"column"}>
          {cart?.map((item, index) => {
            return (
              <ItemCard
                image={item?.product.imageURL}
                title={item?.product.title}
                price={item?.product.price}
                key={index}
                id={index}
              />
            );
          })}

          {cart?.length === 0 ? (
            <Flex justify={"center"} align={"center"} h={500}>
              <Text size={"xl"} color="dimmed">
                Cart is Empty, Add few items.
              </Text>
            </Flex>
          ) : (
            <Paper withBorder py={5}>
              <Flex justify={"space-between"} align={"center"} px={20}>
                <Text size={"xl"}>
                  Total: <b>${totalSum}</b>
                </Text>
                <Link onClick={cartClose} to={"/checkout"}>
                  <Button>Checkout</Button>
                </Link>
              </Flex>
            </Paper>
          )}
        </Flex>
      </Drawer>
    </>
  );
}
