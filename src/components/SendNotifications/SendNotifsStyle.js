import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    rootentry: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "60%",
      },
      button: {
        float: "right",
      },
      formControl: {
        margin: theme.spacing(3),
      },
    },
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 200,
      minWidth: 200,
    },
    hidden: {
      display: "none",
    },
    cardDisplay:{
      width: "70%",
      margin: theme.spacing(3),
    },
    sendButton:{
      marginLeft: "30%"
    },

    checkbox:{
      padding: "20%",
    },
    [theme.breakpoints.down('md')]: {
      input : {
        marginTop: "10%",
        marginBottom: "10%"
      },
    },
  }));

  export {useStyles}