import { createStyles, Text, SimpleGrid, Container, rem } from "@mantine/core";
import { IconTruck, IconCertificate, IconCoin } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: rem(100),
    width: rem(160),
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

function Feature({ icon: Icon, title, description, className, ...others }) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={rem(38)} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: "Free Worldwide shipping",
    description:
      "No-cost shipping service that delivers purchases worldwide without additional charges, making online shopping convenient and accessible internationally.",
  },
  {
    icon: IconCertificate,
    title: "Best Quality Product",
    description:
      "Top-notch products that boast exceptional quality, ensuring customer satisfaction and delivering the best possible value for their investment",
  },
  {
    icon: IconCoin,
    title: "Very Affordable Pricing",
    description:
      "High-quality products offered at budget-friendly prices, ensuring affordability without compromising on value or customer satisfaction.",
  },
];

export function About() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container
      mt={30}
      mb={30}
      size="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "400px",
      }}
    >
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
