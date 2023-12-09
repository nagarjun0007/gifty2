import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Container,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Logo from "../Utlity/Logo";
import { Link, NavLink } from "react-router-dom";
import LoggedInMenu from "./LoggedInMenu";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { HeaderSearch } from "../Search";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hightLight: {
    borderBottom: `2px solid ${theme.colors.blue[7]} !important`,
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const hideSearchBar = useMediaQuery(`(min-width: 870px)`);
  const { userDetails } = useContext(UserContext);

  const [activeLink, setActiveLink] = useState("home");

  return (
    <Box>
      <Header height={60} px="md">
        <Container sx={{ height: "100%" }} size={"xl"}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Logo />
            <Group sx={{ height: "100%" }} spacing={0} className={classes.hiddenMobile}>
              <NavLink
                onClick={() => {
                  setActiveLink("home");
                }}
                to="/"
                className={`${classes.link} ${activeLink === "home" ? classes.hightLight : null}`}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => {
                  setActiveLink("about");
                }}
                to="/about"
                className={`${classes.link} ${activeLink === "about" ? classes.hightLight : null}`}
              >
                About
              </NavLink>
              {userDetails && (
                <NavLink
                  onClick={() => {
                    setActiveLink("explore");
                  }}
                  to="/gallery"
                  className={`${classes.link} ${
                    activeLink === "explore" ? classes.hightLight : null
                  }`}
                >
                  Explore
                </NavLink>
              )}
              {userDetails?.isArtist && (
                <NavLink
                  onClick={() => {
                    setActiveLink("create");
                  }}
                  to="/create"
                  className={`${classes.link} ${
                    activeLink === "create" ? classes.hightLight : null
                  }`}
                >
                  Create
                </NavLink>
              )}
              {hideSearchBar ? userDetails && <HeaderSearch /> : null}
            </Group>

            <Group className={classes.hiddenMobile}>
              {userDetails ? (
                <LoggedInMenu />
              ) : (
                <>
                  <Link to={"/login"}>
                    <Button component="div" variant="default">
                      Login
                    </Button>
                  </Link>
                  <Link to={"/register"}>
                    <Button component="div" variant="filled">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </Group>

            <Group className={classes.hiddenDesktop}>
              {userDetails && <LoggedInMenu />}

              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
            </Group>
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="GIFTY"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/about" className={classes.link}>
            About
          </Link>
          {userDetails && (
            <Link to="/gallery" className={classes.link}>
              Explore
            </Link>
          )}
          {userDetails?.isArtist && (
            <Link to="/create" className={classes.link}>
              Create
            </Link>
          )}

          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
