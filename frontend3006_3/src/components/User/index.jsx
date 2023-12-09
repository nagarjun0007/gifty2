import { useContext } from "react";
import { Box, Container } from "@mantine/core";
import UserProfile from "./UserProfile";
import UserSaved from "./UserSaved";
import UserSettings from "./UserSettings";
import UserDashboard from "./UserDashboard";
import UserActivity from "./UserActivity";
import { UserOrders } from "./UserOrders";
import { DashboardContext } from "../../context/DashboardContext";

export default function User() {
  const { active, setActive } = useContext(DashboardContext);

  return (
    <Box>
      <Container size="xl">
        <UserDashboard active={active} setActive={setActive}>
          {active === "Profile" ? (
            <>
              <UserProfile />
              <UserSaved />
            </>
          ) : active === "Orders" ? (
            <UserOrders />
          ) : active === "UserActivity" ? (
            <UserActivity />
          ) : active === "Settings" ? (
            <UserSettings />
          ) : null}
        </UserDashboard>
      </Container>
    </Box>
  );
}
