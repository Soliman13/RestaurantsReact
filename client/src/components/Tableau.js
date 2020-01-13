import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RestaurantInfos from './RestaurantInfos';

const { useRef } = React;

const Tableau = (props) => {
  const [restoSelected, setRestoSelected] = React.useState(null);
  
  const childRef = useRef();
  
  const handleClick = (row) => {
            setRestoSelected(row)
    childRef.current.handleOpen()
  }
  
  return (
    <div>
    <RestaurantInfos ref = {childRef}
              resto = {restoSelected}></RestaurantInfos>
      <TableContainer component={Paper}>
                        <Table className="table" aria-label="tableau de restaurants">
    <TableHead>
    <TableRow>
    <TableCell>Nom</TableCell>
    <TableCell align="center">Cuisine</TableCell>
    <TableCell align="center">Quartier</TableCell>
    <TableCell align="center">Note moyenne /20</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {props.restos.map(row => (
      
      <TableRow key={row._id} onClick={() => {handleClick(row)}} style={{cursor: 'pointer'}}>
      <TableCell component="th" scope="row">
      {row.name}
      </TableCell>
      <TableCell align="center">{row.cuisine}</TableCell>
      <TableCell align="center">{row.borough}</TableCell>
      <TableCell align="center">{getMoyenne(row)} sur {row.grades.length} notes</TableCell>
      </TableRow>
      
      ))}
      </TableBody>
      </Table>
      </TableContainer>
      </div>
      );
    }
    
    const getMoyenne = (row) => {
      let noteMoyenne = 0;
      
      if(row.grades.length){
        row.grades.forEach(element => {
          noteMoyenne += element.score;
        });
        noteMoyenne /= row.grades.length;
        noteMoyenne = Math.round(noteMoyenne*100)/100;
      }
      else{
        noteMoyenne = "Aucune note";
      }
      return noteMoyenne
    }
    
    export default Tableau;