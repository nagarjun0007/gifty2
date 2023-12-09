import { Link } from "react-router-dom";

export default function CustomLink({ href, children, styles }) {
  return (
    <Link
      style={{
        color: "inherit",
        textDecoration: "none",
        ...styles,
      }}
      to={href}
    >
      {children}
    </Link>
  );
}
