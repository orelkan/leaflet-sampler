import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FeaturesState } from '../store/features';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    zIndex: 1000,
    position: 'fixed',
    bottom: 0,
    height: '35vh'
  }
});

export default function FeaturesTable() {
  const classes = useStyles();
  const points = useSelector((store: FeaturesState) => store.points);
  const isTableDisplayed = useSelector((store: FeaturesState) => store.isTableDisplayed);

  return (
    <Slide direction="up" in={isTableDisplayed}>
      <TableContainer className={classes.root} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.latlng.lat}</TableCell>
                <TableCell align="right">{row.latlng.lng}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Slide>
  );
}