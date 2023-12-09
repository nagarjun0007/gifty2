import { useContext, useEffect, useState } from "react";
import { Tabs, Box, Text, Loader, Grid, Image, Paper } from "@mantine/core";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserSaved() {
  const [activeTab, setActiveTab] = useState("first");
  const [createdPosts, setCreatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useContext(UserContext);

  const getUserCreatedPosts = async () => {
    setLoading(true);
    try {
      let userId = userDetails._id;
      const response = await axios.get(`/posts/${userId}`);
      setCreatedPosts(response.data.posts);
      setLoading(false);
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
  };

  useEffect(() => {
    getUserCreatedPosts();
  }, []);

  return (
    <Tabs
      sx={{
        "& .mantine-Tabs-tabsList": {
          border: "none !important",
          justifyContent: "center",
        },
        "& .mantine-Tabs-panel": {
          minHeight: "0 !important",
        },
      }}
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List>
        <Tabs.Tab value="first">Created</Tabs.Tab>
        <Tabs.Tab value="second">Saved</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">
        <UserItemsWrapper data={createdPosts} loading={loading} />
      </Tabs.Panel>
      <Tabs.Panel value="second">
        <UserItemsWrapper data={[]} />
      </Tabs.Panel>
    </Tabs>
  );
}

function UserItemsWrapper({ loading, data }) {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "250px",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "250px",
      }}
    >
      {data?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "250px",
          }}
        >
          <Text size={"lg"} c="dimmed">
            No Items
          </Text>
        </Box>
      ) : (
        <Box
          sx={{
            padding: "30px 0",
          }}
        >
          <Grid>
            {data?.map((post, index) => {
              return (
                <Grid.Col xs={12} md={4} key={index}>
                  <Paper withBorder>
                    <Image height={160} src={post.imageURL} alt={post.title} />
                    <Box
                      sx={{
                        padding: "10px",
                      }}
                    >
                      <Text
                        sx={{
                          fontSize: "18px",
                        }}
                      >
                        {post.title}
                      </Text>
                      <Text color="dimmed">{post.desciption}</Text>
                    </Box>
                  </Paper>
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
