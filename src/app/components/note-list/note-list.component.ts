import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Note } from "src/app/interfaces/note";
import { NoteService } from "src/app/services/note/note.service";

@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.scss"],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  @Output() selectedNote = new EventEmitter<Note>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotesObservable().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  handleDeleteNote(noteId: number) {
    this.noteService.deletNote(noteId);
  }

  handleEditNote(note: Note) {
    this.noteService.setEditable(true);
    this.selectedNote.emit(note);
  }
}
