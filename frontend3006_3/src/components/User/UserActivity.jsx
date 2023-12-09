import { Box, Tabs, Text } from "@mantine/core";

export default function UserActivity() {
  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery">Liked</Tabs.Tab>
          <Tabs.Tab value="messages">Comments</Tabs.Tab>
          <Tabs.Tab value="settings">Following</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Text size={"lg"} c="dimmed">
              No Data
            </Text>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Text size={"lg"} c="dimmed">
              No Data
            </Text>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Text size={"lg"} c="dimmed">
              No Data
            </Text>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
