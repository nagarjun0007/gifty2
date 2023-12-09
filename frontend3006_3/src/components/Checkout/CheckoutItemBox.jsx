import { Box, Flex, Image, Paper, Text } from "@mantine/core";
import React from "react";

export default function CheckoutItem({ imageURL, title, description, price }) {
  return (
    <Paper withBorder radius={"md"}>
      <Flex
        sx={{
          padding: "25px",
          gap: "20px",
        }}
      >
        <Box>
          <Image radius={"lg"} src={imageURL} width={250} height={200} />
        </Box>
        <Flex direction={"column"}>
          <Text size={"xl"}>{title}</Text>
          <Text lineClamp={"2"} size={"lg"} color="dimmed">
            {description}
          </Text>
          <Text mt={"auto"} size={"xl"}>
            ${price}
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
}
