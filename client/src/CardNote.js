import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    maxWidth: 800,
    width: '95%',
    margin: `${theme.spacing.unit * 2}px auto`,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

const CardNote = ({ classes, note, handleNoteDelete, handleNoteEdit }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography type="headline" component="h2">
        {note.title}
      </Typography>
      <Typography component="p">
        {note.text}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => handleNoteDelete(note.id)}>
        <DeleteIcon />
      </Button>
      <Button size="small" onClick={() => handleNoteEdit(note.id)}>
        <ModeEditIcon />
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(CardNote);
