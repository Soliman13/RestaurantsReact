import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SimpleMap from './SimpleMap';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    width: '50%',
    boxShadow: theme.shadows[5],
    paddingLeft: theme.spacing(2),
  },
}));
const { forwardRef, useImperativeHandle } = React;

const RestaurantInfos = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  useImperativeHandle(ref, () => ({
    
    handleOpen(){
      setOpen(true);
    },
    
  }));
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const getCenter = (coordonnees) => {
    return {"lat": coordonnees[0], "lng": coordonnees[1]}
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toDateString();
  }
  
  // on affiche si un restau a été sélectionné sinon rien
  if(props.resto){
    return (
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
      <div className={classes.paper}>
      <h2 id="transition-modal-title" style={{textAlign: 'center'}}>{props.resto.name}</h2>
      <div style = {{textAlign: 'center'}}>{props.resto.address.building} {props.resto.address.street} {props.resto.address.zipcode} {props.resto.borough}</div>
      {/* <SimpleMap center = {getCenter(props.resto.address.coord)} zoom = {11}></SimpleMap> */}
      <h4>Cuisine</h4>
      {props.resto.cuisine}
      <h4>Notes</h4>
      {props.resto.grades.map((row, index) => (
        <div key = {index}>
        <p><span style={{fontWeight: 'bold'}}>Date</span>: {formatDate(row.date)}</p>
        <p><span style={{fontWeight: 'bold', 'color': 'blue'}}>Grade</span>: {row.grade} --- <span style={{fontWeight: 'bold', 'color': 'blue'}}>Score</span>: {row.score}</p>
        </div>
        
        ))}
        </div>
        </Fade>
        </Modal>
        );
      }
    });
    
    export default RestaurantInfos