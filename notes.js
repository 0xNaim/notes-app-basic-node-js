const fs = require('fs');
const chalk = require('chalk');

// add notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green('New note added!'));
  } else {
    console.log(chalk.red('Note title taken!'));
  }
};

// remove notes
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green('Note removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red('Note not found!'));
  }
};

// list notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(notes)

  notes.forEach((note) => {
    console.log(chalk.white.inverse('Your notes'));
    console.log(note.title);
  });
};

// read notes
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.white.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('Note not found!'));
  }
};

// save notes
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// load notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json', 'utf-8');
    return JSON.parse(dataBuffer);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
