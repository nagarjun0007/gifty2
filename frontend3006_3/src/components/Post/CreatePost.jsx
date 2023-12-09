import {
  ActionIcon,
  Box,
  Button,
  Container,
  Grid,
  Image,
  Loader,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DropzoneButton } from "./DropzoneButton";
import { useContext, useState } from "react";
import { uploadFile } from "@uploadcare/upload-client";
import { IconCurrencyDollar } from "@tabler/icons-react";
import axios from "axios";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { getTime } from "../../utils/time";
export default function CreatePost() {
  const { userDetails } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

  const [postData, setPostData] = useState({
    title: "",
    desciption: "",
    price: undefined,
  });
  const [loading, setLoading] = useState(false);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  function handleChange(event) {
    let { name, value } = event.target;

    setPostData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function uploadImage() {
    setLoading(true);
    let file = files[0];
    uploadFile(file, {
      publicKey: "86bad41ef09c3fc34ab7",
      store: "auto",
      metadata: {
        subsystem: "js-client",
        pet: "test",
      },
    })
      .then((response) => {
        savePost(response?.cdnUrl);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function savePost(imageURL) {
    try {
      const result = await axios.post("/posts/create", {
        artistId: userDetails._id,
        title: postData.title,
        desciption: postData.description,
        price: parseInt(postData.price),
        imageURL: imageURL,
        artistName: userDetails?.userName,
        createAt: getTime(),
        token: auth,
      });
      toast.success("Post created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  return (
    <Box>
      <Container size="xl">
        <Box
          sx={{
            padding: "50px 20px",
          }}
        >
          <Text
            variant="text"
            sx={{
              fontSize: "30px",
            }}
          >
            Create Post
          </Text>
          <br />
          <Box>
            <Grid gutter={5} justify="space-evenly">
              <Grid.Col span={4}>
                {files.length === 0 ? (
                  <DropzoneButton setFiles={setFiles} files={files} />
                ) : (
                  <Box>
                    <Button
                      onClick={() => {
                        setFiles([]);
                      }}
                      sx={{
                        marginBottom: "10px",
                      }}
                    >
                      Change image &nbsp;
                      <IconSquareRoundedXFilled />
                    </Button>
                    <SimpleGrid breakpoints={[{ maxWidth: "sm", cols: 1 }]}>{previews}</SimpleGrid>
                  </Box>
                )}
              </Grid.Col>
              <Grid.Col
                span={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <TextInput
                  value={postData.title}
                  onChange={handleChange}
                  name="title"
                  size="md"
                  label="Title"
                  placeholder="Add title"
                  required
                />
                <Textarea
                  value={postData.description}
                  onChange={handleChange}
                  name="description"
                  size="md"
                  placeholder="Write a detailed description for your Post here"
                  label="Description"
                  minRows={8}
                  withAsterisk
                />
                <TextInput
                  type="number"
                  value={postData.price}
                  onChange={handleChange}
                  name="price"
                  size="md"
                  label="Price"
                  icon={<IconCurrencyDollar />}
                  placeholder="100"
                  required
                />

                <Button disabled={loading} onClick={uploadImage}>
                  {loading ? <Loader size={"sm"} color="white" /> : "Publish"}
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
