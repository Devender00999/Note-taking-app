import { Injectable } from "@angular/core";
import { Note } from "../../interfaces/note";
import { Observable, BehaviorSubject } from "rxjs";
import { DBService } from "../db/db.service";

@Injectable({
  providedIn: "root",
  useExisting: [DBService],
})
export class NoteService {
  private notes: Array<Note> = [];
  dbName = "notes";
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private isEdit = new BehaviorSubject<boolean>(false);

  constructor(private dbService: DBService<Note[]>) {
    this.notes = this.dbService.getData(this.dbName);
    this.notesSubject.next(this.notes);
  }

  setEditable(value: boolean): void {
    this.isEdit.next(value);
  }

  getEditable(): Observable<boolean> {
    return this.isEdit.asObservable();
  }

  createNote(note: Note): void {
    note.id = Date.now();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
    this.dbService.saveData(this.dbName, this.notes);
  }

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  deletNote(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.notesSubject.next(this.notes);
    this.dbService.saveData(this.dbName, this.notes);
  }

  updateNote(note: Note) {
    const index = this.notes.findIndex((n) => note.id === n.id);
    if (index !== -1) {
      this.notes[index] = note;
      this.notesSubject.next(this.notes);
      this.dbService.saveData(this.dbName, this.notes);
    }
  }

  getAllNotes() {
    return this.notes;
  }
}
