import skinconfig from "./skins";
import Logo from "../../assets/logo";
import { getTransparent } from "../../utils";

const theme = {
  ...skinconfig,
  main: {
    width: "100vw",
    minHeight: "100dvh",
    bg: "palette.blues.0",
  },
  container: {
    as: "main",
    maxWidth: { _: "96vw", md: "88vw" },
    mx: "auto",
    p: { _: "m", md: "l" },
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
    title: { fontWeight: 600, style: { textWrap: "balance" } },
    subtitle: { color: "secondary" },
    strap: { color: "tertiary" },
  },
  logo: {
    asset: Logo,
    color: "primary",
    assetProps: {
      width: "8rem",
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
