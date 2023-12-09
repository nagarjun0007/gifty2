import { Box, Title, Text, Container } from "@mantine/core";

export default function Hero() {
  return (
    <Box>
      <Container
        sx={{
          position: "relative",
          height: "100vh",
        }}
        size={"xl"}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Title
            order={1}
            sx={{
              fontSize: "50px",
            }}
          >
            Unleash Creativity, Elevate Gifting <br />
            <Text
              sx={{
                fontSize: "34px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Discover Unique Custom Gifts with MERA
            </Text>
          </Title>
        </Box>
      </Container>
    </Box>
  );
}
