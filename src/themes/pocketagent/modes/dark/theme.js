import skinconfig from "./skins";
import Logo from "../../assets/logo";
import { getTransparent } from "../../utils";

const theme = {
  ...skinconfig,
  main: {
    bg: "palette.neutrals.1",
    color: "light",
    minHeight: "100dvh",
    display: "grid",
  },

  container: {
    //gridTemplateColumns: "4rem 1fr 25rem",

    bg: "neutral",
    borderRadius: "1rem 0 0 0",
    mt: "xsmall",
    border: "1px solid",
    borderColor: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 0 8px rgba(0,0,0,0.16)",
    borderWidth: "1px 0 0 1px",
    overflow: "auto",
    p: "large",
  },
  header: {
    public: {
      wrapper: {
        height: "3.25rem",
        borderBottom: "1px solid",
        borderColor: "surface",
        bg: getTransparent(skinconfig.colors.base, 0.9),
        position: "fixed",
        top: "0px",
        zIndex: 9999,
      },
      container: {
        width: "100%",
        maxWidth: "17",
        mx: "auto",
        p: "small",
      },
      underlay: {
        color: "transparent.dark.8",
        bg: "transparent",
      },
      menu: {
        item: {
          highlight: {
            bg: "brand",
          },
        },
      },
    },
  },
  heading: {
    container: {
      display: "flex",
      flexDirection: "column",
      py: { _: "medium", md: "large" },
    },
    title: { fontWeight: 900 },
    subtitle: { color: "secondary" },
    strap: { color: "tertiary" },
  },
  logo: {
    asset: Logo,
    color: "tertiary",
    assetProps: {
      width: "2.5rem",
    },
  },
  footer: {
    logo: {
      asset: Logo,
      color: "tertiary",
      assetProps: {
        mark: false,
        width: "12rem",
        height: "auto",
      },
    },
    container: {},
  },
};
export default theme;
