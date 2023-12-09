import { Box, Button, Container, Grid, Image, Text, Title } from "@mantine/core";
import React from "react";

export default function SectionThree() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffe2eb",
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
            <Image src="section3/person.jpg" />
          </Grid.Col>
          <Grid.Col
            sx={{
              alignSelf: "center",
            }}
            md={6}
            sm={12}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Title
                sx={{
                  fontSize: "60px",
                }}
              >
                See it, make it, try it, do it
              </Title>
              <Text
                my={10}
                sx={{
                  margin: "0 auto",
                  fontSize: "24px",
                  width: "70%",
                }}
              >
                The best part of MERA is discovering new things and ideas from people around the
                world.
              </Text>
              <Button size="lg">Explore</Button>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
