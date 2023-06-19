import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  appBar: {
    margin: "auto",
    backgroundColor: "#888888",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    maxWidth: 913,
    transition: "none",
  },
  content: {
    marginTop: theme.spacing(7),
    width: "100%",
    margin: "auto",
  },
  root: {
    margin: "auto",
    marginTop: theme.spacing(3),
    width: "100%",
    maxWidth: 800,
  },
  card: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  cardContent: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    padding: "16px 8px",
    flexGrow: 1,
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  pagination: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  Icon: {
    width: "100%",
    position: "absolute",
    right: theme.spacing(0.5),
    bottom: theme.spacing(0.2),
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  ratingButton: {
    margin: theme.spacing(1),
    right: -theme.spacing(7),
    padding: "4px",
    backgroundColor: "#777777",
    color: "white",
  },
  ratingForm: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    backgroundColor: "#888888",
  },
  ratingBox: {
    margin: theme.spacing(2),
  },
  submitButtonBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginTop: "72px",
  },
  signupButton: {
    marginTop: "24px",
    marginBottom: "24px",
  },
}));
