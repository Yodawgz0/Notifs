import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	 cardDisplay:{
      width: "70%",
      margin: theme.spacing(3),
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
   
}));
 export {useStyles}