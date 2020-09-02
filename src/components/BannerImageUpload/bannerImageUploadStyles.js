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
    ViewImagebutton: {
      marginTop: "6ch",
      marginLeft:"50%"
    },
    deletebutton: {
    },
    progressBar:{
      margin: "10%",
    },
    heading: { textAlign: "center", margin: "2%" },
    carouselDisplay:{
      margin: "10ch",
      padding:"10ch"

    },
    deleteButtonList:{
      marginTop: "2ch",
      marginLeft:"50%"
    },
    ImageCarousel:{
      height:"40%"
    },

    [theme.breakpoints.up('md')]: {
      ViewImagebutton: {
        marginTop: "2ch",
        marginLeft:"50%"
      },
      deleteButtonList:{
        marginTop: "2ch",
        marginLeft:"300%"
      },
    },

    [theme.breakpoints.down('md')]: {
      input : {
        margin: "10%",
        marginBottom: "10%"
      },
      button : {
        margin: "2%",
      },
      deletebutton:{
        marginLeft:"10%"
      },
      deleteButtonList:{
        margin: "15%"
      },
      carouselDisplay:{
        margin: "10ch",
        padding:"10ch",
      },
      ImageCarousel:{
        height:"20%",
        width: "100%"
      },
      ViewImagebutton: {
        marginTop: "3ch",
        marginLeft:"20%"
      },
    },

}));
 export {useStyles}