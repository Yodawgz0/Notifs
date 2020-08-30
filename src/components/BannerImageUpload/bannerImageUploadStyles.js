import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	 cardDisplay:{
      width: "90%",
      margin: theme.spacing(3),
      maxHeight: "5%"
    },
     sendButton:{
      marginLeft: "30%"
    },
    [theme.breakpoints.down('md')]: {
      input : {
        marginTop: "10%",
        marginBottom: "10%"
      },
    },
    button: {
      marginLeft: "0%",
    },
    deletebutton: {
      marginTop: "60%"
    },
    heading: { textAlign: "center", margin: "2%" },
}));
 export {useStyles}