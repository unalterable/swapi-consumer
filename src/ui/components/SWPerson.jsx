import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '20px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
});

class SWPerson extends React.Component {
  render() {
    const { classes, person } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={person.name}
          avatar={<Avatar className={classes.avatar}>LS</Avatar>}
          subheader={`${person.species} | ${person.homeworld}`}
        />
        <CardContent>
          <Typography component="p">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Birth Year</TableCell>
                  <TableCell>{person.birth_year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Eyes</TableCell>
                  <TableCell>{person.eye_color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{person.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Films</TableCell>
                  <TableCell>{person.films.map(film => (<div key={film}>{film}</div>))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SWPerson);

