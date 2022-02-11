import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-commentbox",
  templateUrl: "./commentbox.component.html",
  styleUrls: ["./commentbox.component.scss"],
})
export class CommentboxComponent implements OnInit {
  commentForm: FormGroup;
  @Input() productId: any;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  @Output() usercomment = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {
      const obj = {
        comment: this.commentForm.controls["comment"].value,
        userId: localStorage.getItem("user_id"),
        merchandiserSurveyDetailId: this.productId,
        username: localStorage.getItem("user_name"),
        date: moment(new Date()).format("YYYY-MM-DD"),
      };
      this.commentForm.controls["comment"].setValue("");
      this.usercomment.emit(obj);
    }
  }
}
