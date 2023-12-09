import { Box, Image, Loader, Table, Text } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export function UserOrders() {
  const [productsData, setProductsData] = useState([]);

  const { userDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    let userId = userDetails._id;
    try {
      const response = await axios.get(`/orders/${userId}`);
      getAllProductIds(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  function getAllProductIds(userOrders) {
    let tempArr = [];
    userOrders.forEach((order) => {
      tempArr.push(...order.productIds);
    });
    getProducts(tempArr);
  }

  async function getProducts(productIds) {
    setLoading(true);
    try {
      const response = await axios.post("/posts/arrayOfIds", {
        arrayOfIds: productIds,
      });
      setProductsData(response.data.posts.reverse());
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

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
    <>
      {productsData?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "250px",
          }}
        >
          <Text size={"lg"} c="dimmed">
            No Orders
          </Text>
        </Box>
      ) : (
        <Table highlightOnHover withBorder miw={700}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {productsData?.map((row, index) => (
              <tr key={index}>
                <td>
                  <Image width={60} height={40} src={row.imageURL} />
                </td>
                <td>{row.title}</td>
                <td>$ {row.price}</td>
                <td>{row.createAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
