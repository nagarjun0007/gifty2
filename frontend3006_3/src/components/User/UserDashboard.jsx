import {
  createStyles,
  Navbar,
  Group,
  Box,
  getStylesRef,
  rem,
  Paper,
  Text,
  Button,
  Avatar,
} from "@mantine/core";
import {
  IconSettings,
  IconLogout,
  IconUserCircle,
  IconTruckDelivery,
  IconActivity,
} from "@tabler/icons-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "", label: "Profile", icon: IconUserCircle },
  { link: "", label: "Orders", icon: IconTruckDelivery },
  { link: "", label: "UserActivity", icon: IconActivity },
  { link: "", label: "Settings", icon: IconSettings },
];

export default function UserDashboard({ children, active, setActive }) {
  const { userDetails } = useContext(UserContext);

  function handleDashboardLogout() {
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
  }

  const { classes, cx } = useStyles();
  const { updateUserDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const links = data.map((item) => (
    <Box
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Box>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        gap: "20px",
        margin: "20px 0",
      }}
    >
      <Paper withBorder>
        <Navbar
          sx={{
            borderRight: "none",
          }}
          height={700}
          width={{ sm: 300 }}
          p="md"
        >
          <Navbar.Section grow>
            <Group className={classes.header}>
              <Avatar color="blue" radius="xl" />
              <Box>
                <Text size={"sm"}>Hello,</Text>
                <Text size={"lg"}>{userDetails.userName}</Text>
              </Box>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <Button
              onClick={handleDashboardLogout}
              variant="default"
              component="div"
              className={classes.link}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </Button>
          </Navbar.Section>
        </Navbar>
      </Paper>
      <Paper mih={700} p="md" w={"100%"} withBorder>
        <Box>{children}</Box>
      </Paper>
    </Box>
  );
}
