import { Box, Button, Container, Grid, Text, Title } from "@mantine/core";
import React from "react";

export default function SectionTwo() {
  return (
    <Box
      sx={{
        backgroundColor: "#dafff6",
      }}
    >
      <Container size={"xl"}>
        <Grid
          sx={{
            minHeight: "100vh",
          }}
        >
          <Grid.Col
            sx={{
              alignSelf: "center",
            }}
            md={6}
            sm={12}
          >
            <Box
              sx={{
                flex: 1,
                height: "100%",

                textAlign: "center",
              }}
            >
              <Title
                sx={{
                  fontSize: "60px",
                }}
              >
                Save ideas you like
              </Title>
              <Text
                my={10}
                sx={{
                  margin: "0 auto",
                  fontSize: "24px",
                  width: "60%",
                }}
              >
                Collect your favorites so you can get back to them later.
              </Text>
              <Button size="lg">Explore</Button>
            </Box>
          </Grid.Col>
          <Grid.Col md={6} sm={12}>
            <Box
              sx={{
                flex: 1,
                alignSelf: "center",
                position: "relative",
                width: "100%",
                minHeight: "100vh",
              }}
            ></Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
