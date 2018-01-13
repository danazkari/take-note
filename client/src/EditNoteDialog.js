import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Toolbar from 'material-ui/Toolbar';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
  },
  content: {
    height: '100vh',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props}/>;
}

const EditNoteDialog = ({classes, note, isOpen, handleValueChange, handleSave, handleClose}) => (
  <Dialog
    fullScreen
    open={isOpen}
    onClose={handleClose}
    transition={Transition}
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={handleClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <TextField
          className={classes.title}
          placeholder="Note Title"
          value={note ? note.title : ''}
          onChange={({ target: { value } }) => handleValueChange(value, 'title')}
        />
        <Button color="inherit" onClick={handleSave}>
          save
        </Button>
      </Toolbar>
    </AppBar>
    <textarea
      value={note ? note.text : ''}
      onChange={({ target: { value } }) => handleValueChange(value, 'text')}
      className={classes.content}
    />
  </Dialog>
);

export default withStyles(styles)(EditNoteDialog);
