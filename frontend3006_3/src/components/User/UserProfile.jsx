import { Avatar, Text, Button, Group, Paper, Box } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const data = {
  avatar: "",
  name: "Manideep Yadav",
  email: "manideep@me.io",
  job: "Developer",
};

export default function UserProfile() {
  const { userDetails } = useContext(UserContext);

  return (
    <Box
      sx={{
        margin: "30px auto",
        maxWidth: "500px",
      }}
    >
      <Paper
        sx={{
          padding: "30px 0",
        }}
      >
        <Avatar src={data.avatar} size={120} radius={120} mx="auto" />
        <Text ta="center" fz="lg" weight={500} mt="md">
          {userDetails.userName}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {userDetails.email}
        </Text>
        <Group position="center">
          {/* <Button variant="default" mt="md">
            Share
          </Button> */}
          <Button variant="default" mt="md">
            Edit profile
          </Button>
          {/* <Button variant="default" mt="md">
            Send message
          </Button> */}
        </Group>
      </Paper>
    </Box>
  );
}
