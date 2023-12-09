import { Title } from "@mantine/core";
import CustomLink from "./CustomLink";

export default function Logo() {
  return (
    <CustomLink
      styles={{
        fontSize: "40px",
      }}
      underline={false}
      href="/"
    >
      <Title>GIFTY</Title>
    </CustomLink>
  );
}
