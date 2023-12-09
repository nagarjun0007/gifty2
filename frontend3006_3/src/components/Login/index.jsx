import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
} from "@mantine/core";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const { updateUserDetails } = useContext(UserContext);
  const { updateAuth } = useContext(AuthContext);

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await axios.post("/users/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      });
      setLoading(false);
      updateAuth(response.data?.token);
      updateUserDetails(response.data?.userDetails);
      navigate("/gallery");
      toast.success("Successfully logged in", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  }

  return (
    <Container size={420} my={60}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to={"/register"} size="sm">
          Create account
        </Link>
      </Text>

      <form>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            value={loginDetails.email}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, email: event.currentTarget.value })
            }
            label="Email"
            placeholder="you@gifty.dev"
            required
          />
          <PasswordInput
            value={loginDetails.password}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, password: event.currentTarget.value })
            }
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button disabled={loading} onClick={handleLogin} fullWidth mt="xl">
            {loading ? <Loader size={"sm"} color="white" /> : "Log in"}
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
