import { useContext, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Checkbox,
  Stack,
  Container,
  Title,
  Button,
  Loader,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateUserDetails } = useContext(UserContext);
  const [formData, setFromData] = useState({
    email: "",
    name: "",
    password: "",
    terms: false,
    isArtist: false,
  });

  const [formErrors, setFromErrors] = useState({
    email: "",
    name: "",
    password: "",
    terms: true,
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setFromData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleRegister() {
    if (handleDisabeRegister()) {
      toast.info("Please fill all the required fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post("/users/register", {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        isArtist: formData.isArtist,
      });
      updateUserDetails(result.data?.userDetails);
      navigate("/login");
      setLoading(false);
      toast.success("Registration successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err.response.data.message);
    }
  }

  function handleDisabeRegister() {
    if (formData.email.length === 0) {
      return true;
    } else if (formData.name.length === 0) {
      return true;
    } else if (formData.password.length < 7) {
      return true;
    } else if (!formData.terms) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container size={420} my={60}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to MERA! Register
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link to={"/Login"} size="sm">
          Login
        </Link>
      </Text>

      <Paper mt={30} radius="md" p="xl" withBorder>
        <form>
          <Stack>
            <TextInput
              name="name"
              label="Name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              radius="md"
              required
            />

            <TextInput
              type="email"
              name="email"
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email && "Invalid email"}
              radius="md"
            />
            <PasswordInput
              name="password"
              required
              label="Password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              error={
                formErrors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
            <Checkbox
              name="terms"
              label="Are you an Artist?"
              checked={formData.isArtist}
              onChange={() => {
                setFromData((prev) => {
                  return { ...prev, isArtist: !formData.isArtist };
                });
              }}
            />
            <Checkbox
              name="terms"
              label="I accept terms and conditions"
              checked={formData.terms}
              onChange={() => {
                setFromData((prev) => {
                  return { ...prev, terms: !formData.terms };
                });
              }}
            />
            <Button
              onClick={handleRegister}
              disabled={loading}
              fullWidth
              mt="xl"
            >
              {loading ? <Loader size={"sm"} color="white" /> : "Register"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
