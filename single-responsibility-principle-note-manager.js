const fs = require('fs');

class NoteManager {
  constructor() {
    this.notes = {};
  }

  addNote(title, content) {
    let id = ++NoteManager.count;
    let note = { title, content };
    this.notes[id] = note;
    return id;
  }

  removeNote(id) {
    delete this.notes[id];
  }

  toString() {
    return Object.entries(this.notes)
      .map(([id, note]) => `${id}: ${note.title} - ${note.content}`)
      .join('\n');
  }
}
NoteManager.count = 0;

class FilePersistenceManager {
    preprocess(noteManager) {
        for (let id in noteManager.notes) {
          let note = noteManager.notes[id];
          note.title = note.title.trim().replace(/\s+/g, ' ');
          note.content = note.content.trim().replace(/\s+/g, ' ');
        }
      }
      

  saveToFile(noteManager, filename) {
    this.preprocess(noteManager);
    fs.writeFileSync(filename, noteManager.toString());
  }

  loadFromFile(filename) {
    return fs.readFileSync(filename, 'utf8');
  }
}

let nm = new NoteManager();
nm.addNote('Meeting Notes', 'Discuss project deadlines.');
nm.addNote('Shopping List', 'Buy smokes and coffee.');
console.log(nm.toString());

let fp = new FilePersistenceManager();
let filename = '/Users/manassarma/Documents/notes.txt'; 
fp.saveToFile(nm, filename);
