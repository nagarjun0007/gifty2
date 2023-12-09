import { Box, Input, PasswordInput, Text, Container, Stack, Button, Loader } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function UserSettings() {
  const { userDetails, updateUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: userDetails.userName,
    email: userDetails.email,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function updateUserDetail() {
    setLoading(true);
    try {
      const result = await axios.put(`/users/update/${userDetails._id}`, {
        userName: userData.name,
        email: userData.email,
      });
      toast.success(
        <Text>
          User updated
          <br />
          Updated name : <b>{result.data.userDetails.userName}</b>
          <br />
          Updated email : <b>{result.data.userDetails.email}</b>
        </Text>,
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setLoading(false);
      updateUserDetails(result.data.userDetails);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  return (
    <Box>
      <Container size={"xl"}>
        <Box
          sx={{
            display: "flex",
            margin: "30px auto",
            flexDirection: "column",
            maxWidth: "420px",
          }}
        >
          <Text mb="lg" size={"xl"}>
            Update profile
          </Text>
          <Stack>
            <Input value={userData.name} onChange={handleChange} placeholder="Name" name="name" />
            <Input
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              name="email"
            />
            {/* <PasswordInput
              value={userData.oldPassword}
              onChange={handleChange}
              placeholder="Old password"
              name="oldPassword"
            />
            <PasswordInput
              value={userData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              name="newPassword"
            />
            <PasswordInput
              value={userData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              name="confirmNewPassword"
            /> */}
            <Button disabled={loading} onClick={updateUserDetail}>
              {loading ? <Loader size={"sm"} color="white" /> : "Update"}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
