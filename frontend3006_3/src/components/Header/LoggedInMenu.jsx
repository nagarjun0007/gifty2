import { useContext, useState } from "react";
import { createStyles, Avatar, UnstyledButton, Group, Text, Menu, rem, Box } from "@mantine/core";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconChevronDown,
  IconTruckDelivery,
} from "@tabler/icons-react";
import CustomLink from "../Utlity/CustomLink";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/DashboardContext";
const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hideUserName: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}));

export default function LoggedInMenu() {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { userDetails, updateUserDetails } = useContext(UserContext);
  const { setActive } = useContext(DashboardContext);

  const navigate = useNavigate();
  return (
    <>
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group spacing={7}>
              <Avatar color="blue" src={""} alt={userDetails.userName} radius="xl" size={30} />
              <Box className={classes.hideUserName}>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {userDetails.userName}
                </Text>
              </Box>
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {/* <Menu.Item icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}>
            Liked posts
          </Menu.Item> */}
          <Menu.Item
            onClick={() => {
              setActive("Profile");
              navigate("/user");
            }}
            icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
          >
            Saved posts
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setActive("Orders");
              navigate("/user");
            }}
            icon={<IconTruckDelivery size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
          >
            Your orders
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>

          <CustomLink href={"/user"}>
            <Menu.Item component="div" icon={<IconSettings size="0.9rem" stroke={1.5} />}>
              Account settings
            </Menu.Item>
          </CustomLink>

          <Menu.Item
            onClick={() => {
              updateUserDetails(null);
              navigate("/");
              toast.info("Logged out!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
            icon={<IconLogout size="0.9rem" stroke={1.5} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
