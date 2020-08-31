import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	 cardDisplay:{
      width: "90%",
      margin: theme.spacing(3),
      maxHeight: "5%",
    },
     sendButton:{
      marginLeft: "30%"
    },
    button: {
    },
    deletebutton: {
      marginTop: "60%"
    },
    progressBar:{
      margin: "5%",
    },
    heading: { textAlign: "center", margin: "2%" },
    [theme.breakpoints.down('md')]: {
      input : {
        margin: "10%",
        marginBottom: "10%"
      },
      button : {
        margin: "2%",
      },
    },

}));
 export {useStyles}