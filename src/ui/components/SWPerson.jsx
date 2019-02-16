import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: { margin: '20px', textAlign: 'left' },
  avatar: { backgroundColor: theme.palette.secondary.main },
});

const SWPerson = ({ classes, person }) => (
  <Card className={classes.card} test_selector="SWPerson">
    <CardHeader
      title={person.name}
      avatar={
        <Avatar className={classes.avatar} test_selector="avatar">
          {person.name.split(' ').map(l => l[0].toUpperCase()).join('')}
        </Avatar>
      }
      subheader={`${person.species} | ${person.homeworld}`}
    />
    <CardContent>
      <Table>
        <TableBody>
          <TableRow test_selector="trait_birth">
            <TableCell>Birth Year</TableCell>
            <TableCell>{person.birth_year}</TableCell>
          </TableRow>
          <TableRow test_selector="trait_eyes">
            <TableCell>Eye Colour</TableCell>
            <TableCell>{person.eye_color}</TableCell>
          </TableRow>
          <TableRow test_selector="trait_gender">
            <TableCell>Gender</TableCell>
            <TableCell>{person.gender}</TableCell>
          </TableRow>
          <TableRow test_selector="trait_films">
            <TableCell>Films</TableCell>
            <TableCell>{person.films.map(film => (<div key={film}>{film}</div>))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default withStyles(styles)(SWPerson);

