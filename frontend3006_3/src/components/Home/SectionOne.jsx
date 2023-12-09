import { Box, Button, Container, Grid, Image, Text, Title } from "@mantine/core";

const imageContainerStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  height: "500px",
};

export default function SectionOne() {
  return (
    <Box
      sx={{
        backgroundColor: "#fffd92",
      }}
    >
      <Container size={"xl"}>
        <Grid
          sx={{
            minHeight: "100vh",
          }}
        >
          <Grid.Col md={6} sm={12}>
            <Box
              sx={{
                flex: 1,
                alignSelf: "center",
                position: "relative",
                width: "100%",
                minHeight: "100vh",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <div
                  style={{
                    ...imageContainerStyles,
                    top: "63%",
                    left: "35%",
                    zIndex: "7",
                  }}
                >
                  <Image radius={"sm"} fit="cover" src={`section1/1.jpg`} alt="Search Topic" />
                </div>
                <div
                  style={{
                    ...imageContainerStyles,
                    top: "35%",
                    left: "20%",
                    zIndex: "9",
                  }}
                >
                  <Image radius={"sm"} fit="cover" src={`section1/2.jpg`} alt="Search Topic" />
                </div>
                <div
                  style={{
                    ...imageContainerStyles,
                    top: "60%",
                    left: "10%",
                    zIndex: "9",
                  }}
                >
                  <Image radius={"sm"} fit="cover" src={`section1/3.jpg`} alt="Search Topic" />
                </div>
                <div
                  style={{
                    ...imageContainerStyles,
                    top: "40%",
                    left: "60%",
                    zIndex: "7",
                  }}
                >
                  <Image radius={"sm"} fit="cover" src={`section1/4.jpg`} alt="Search Topic" />
                </div>
              </Box>
            </Box>
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
                flex: 1,
                height: "100%",

                textAlign: "center",
              }}
            >
              <Title sx={{ fontSize: "60px" }}>Search for an idea</Title>
              <Text
                my={10}
                sx={{
                  margin: "0 auto",
                  fontSize: "24px",
                  width: "60%",
                }}
              >
                What do you want to try next? Think of something you’re into—like “easy chicken
                dinner”—and see what you find.
              </Text>
              <Button size="lg">Search</Button>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
