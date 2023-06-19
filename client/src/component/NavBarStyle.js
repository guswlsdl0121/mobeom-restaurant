import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    height: "80vh",
    width: drawerWidth,
    backgroundColor: "#888888",
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },
  toolbar: {
    height: 48, // 높이를 조정 (예: 48px)
  },
  title: {
    flexGrow: 1,
    marginRight: "4px",
    color: "#ffffff",
    textAlign: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginLeft: "-10px",
    width: "80%", // 너비를 조정 (예: 80%)
    [theme.breakpoints.up("sm")]: {
      marginLeft: "24px",
      width: "80%",
      maxWidth: "230px",
    },
    display: "flex",
    justifyContent: "center",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0, // 우측 정렬을 위해 추가
    cursor: "pointer", // 커서를 클릭표시로 변경
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
  },

  filterTitle: {
    color: "#fff",
    textAlign: "center",
  },

  filterSelect: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
    textAlign: "center",
  },
  filters: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  filter: {
    marginTop: "52px",
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    width: "80%",
    marginLeft: "28px",
    marginTop: "28px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  activeButton: {
    color: "#ffffff",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export default useStyles;
