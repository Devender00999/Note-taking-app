import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Note } from "src/app/interfaces/note";
import { NoteService } from "src/app/services/note.service";

@Component({
  selector: "app-note-form",
  templateUrl: "./note-form.component.html",
  styleUrls: ["./note-form.component.scss"],
})
export class NoteFormComponent implements OnInit, OnChanges {
  noteForm!: FormGroup;
  isEdit!: boolean;

  @Input() selectedNote!: Note;

  constructor(private noteService: NoteService, private formBuilder: FormBuilder) {
    noteService.getEditable().subscribe((resolve) => {
      this.isEdit = resolve;
    });
  }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: 1,
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selectedNote"]?.currentValue) {
      const value = changes["selectedNote"].currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content,
      });
    }
  }

  handleSubmit(): void {
    if (this.noteForm.invalid) return;
    const note: Note = this.noteForm.value;

    // to add note in DB
    if (this.isEdit) {
      this.noteService.updateNote(note);
      this.noteService.setEditable(false);
    } else {
      this.noteService.createNote(note);
    }

    this.noteForm.reset();

    // this.note6
  }
}
