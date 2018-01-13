import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { fetchNotes, deleteNote, createNote, editNote } from './api';
import CardNote from './CardNote';
import EditNoteDialog from './EditNoteDialog';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    height: '100vh',
  },
  toolbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingTop: '65px',
  },
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      dialogMode: null,
      isDialogOpen: false,
      noteToEdit: null,
    };
  }

  handleCreateNote = () => {
    const {
      noteToEdit: { title, text },
      notes: oldNotes
    } = this.state;
    console.log('note being created...', { title, text });
    createNote(title, text)
      .then((newNote) => [...oldNotes, newNote])
      .then(notes => this.setState({
        isDialogOpen: false,
        noteToEdit: null,
        dialogMode: null,
        notes
      }));
  }

  handleCreateNoteIntent = () => {
    const noteToEdit = { title: '', text: '' };
    this.setState({
      isDialogOpen: true,
      dialogMode: 'creating',
      noteToEdit,
    });
  }

  handleValueChange = (value, prop) => {
    const { noteToEdit } = this.state;
    this.setState({
      noteToEdit: {
        ...noteToEdit,
        [prop]: value,
      },
    });
  }

  handleSaveNoteEdit = () => {
    const { noteToEdit, notes: oldNotes } = this.state;
    editNote(noteToEdit)
      .then(() => oldNotes.map(note => note.id === noteToEdit.id ? noteToEdit : note))
      .then(notes => this.setState({
        isDialogOpen: false,
        dialogMode: null,
        notes: [...notes],
        noteToEdit: null,
      }));
  }

  handleNoteEditIntent = (id) => {
    const { notes } = this.state;
    const noteToEdit = notes.find(({ id: noteId }) => noteId === id);
    this.setState({
      dialogMode: 'editing',
      isDialogOpen: true,
      noteToEdit
    });
  }

  handleClose = () => {
    this.setState({
      dialogMode: null,
      isDialogOpen: false,
      noteToEdit: null
    });
  }

  handleNoteDelete = (deletedId) => {
    const { notes: oldNotes } = this.state;
    deleteNote(deletedId)
      .then(() => oldNotes.filter(({ id }) => id !== deletedId))
      .then(notes => this.setState({ notes }));
  }

  componentDidMount() {
    fetchNotes()
      .then(notes => this.setState({ notes }));
  }

  render() {
    const { dialogMode, notes, isDialogOpen, noteToEdit } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <Typography type="title" align="center" color="inherit">
              TakeNote!
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.listContainer}>
          {notes.map(note =>
            <CardNote
              key={`note-${note.id}`}
              note={note}
              handleNoteEdit={this.handleNoteEditIntent}
              handleNoteDelete={this.handleNoteDelete}
            />
          )}
        </div>
        <Button onClick={this.handleCreateNoteIntent} fab color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
        <EditNoteDialog
          isOpen={isDialogOpen}
          note={noteToEdit}
          handleValueChange={this.handleValueChange}
          handleClose={this.handleClose}
          handleSave={dialogMode === 'creating' ? this.handleCreateNote : this.handleSaveNoteEdit}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
