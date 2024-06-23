import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";

@Component({
  selector: 'app-star-rating',
  templateUrl: 'star-rating.component.html',
  styleUrls: ['star-rating.component.css']
})

export class StarRatingComponent implements OnChanges {

  public starWidth: number = 0;

  @Input()

  public rating: number = 0;

  @Output()

  public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    this.starWidth = this.rating * 125 / 5;
  }

  public sendRating() {
    this.starRatingClicked.emit(`the is a value of ${this.rating}`)
  }
}
