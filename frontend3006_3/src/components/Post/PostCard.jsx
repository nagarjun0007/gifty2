import { IconHeart, IconUserPlus, IconChecklist } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },

  like: {
    color: theme.colors.blue[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export function PostCard({ image, title, author, description, price, index }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const { cart, updateCart } = useContext(CartContext);

  function handleAddToCart(index) {
    const found = cart.some((item) => item.id === index);
    if (!found) {
      updateCart([
        ...cart,
        {
          id: index,
          quantity: 1,
          product: products[index],
        },
      ]);
      toast.success("Item added to cart!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Item already in cart!", {
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

  function handleBuy(index) {
    navigate("/checkout");
    const found = cart.some((item) => item.id === index);
    if (!found) {
      updateCart([
        ...cart,
        {
          id: index,
          quantity: 1,
          product: products[index],
        },
      ]);
    }
  }

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image height={250} src={image} alt={title} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="xl" color="green">
            {author}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${price}
            </Text>
          </div>
          <Button
            onClick={() => {
              handleBuy(index);
            }}
            radius="xl"
            style={{ flex: 1 }}
          >
            Buy
          </Button>
          <Button
            onClick={() => {
              handleAddToCart(index);
            }}
            variant="outline"
            radius="xl"
            style={{ flex: 1 }}
          >
            Add to cart
          </Button>
        </Group>
      </Card.Section>

      {/* <Group
        mt="xs"
        grow
        sx={{
          justifyContent: "center",
        }}
      >
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconUserPlus size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>{" "}
        <ActionIcon variant="default" radius="md" size={36}>
          <IconChecklist size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group> */}
    </Card>
  );
}
