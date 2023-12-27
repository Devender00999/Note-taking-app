import { Component } from "@angular/core";
import { Note } from "./interfaces/note";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Note Taking App";
  selectedNote!: Note;
  selectNote(note: Note) {
    this.selectedNote = note;
    console.log({ note });
  }
}
