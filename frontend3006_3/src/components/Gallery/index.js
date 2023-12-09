import { Container, Grid } from "@mantine/core";
import axios from "axios";
import { PostCard } from "../Post/PostCard";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

export default function Gallery() {
  const { auth } = useContext(AuthContext);
  const { products, updateProducts } = useContext(ProductContext);

  async function getPosts() {
    try {
      const response = await axios.get("/posts/all");
      updateProducts(response.data.reverse());
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container size="xl" py={50}>
      <Grid>
        {products?.map((post, index) => {
          return (
            <Grid.Col key={index} md={4} sm={12}>
              <PostCard
                image={post.imageURL}
                author={post.artistName}
                description={post.desciption}
                title={post.title}
                price={post.price}
                index={index}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
