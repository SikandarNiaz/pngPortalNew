import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  Directive,
  ViewChildren,
  QueryList,
  ComponentFactoryResolver,
} from "@angular/core";

export class DatacontainerDirective {
  constructor() {}
}

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges() {}

  removeComment(no) {
    this.postComment.splice(no, 1);
    this.countComments.emit(this.postComment);
  }
}
