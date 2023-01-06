import { Component, Input, EventEmitter ,Output} from "@angular/core";

@Component({
  selector: "rating",
  templateUrl: "rating.html"
})
export class RatingComponent {
  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

  constructor() {}

  rate(index: number) {
      // function used to change the value of our rating 
      this.rating = index;
      // triggered when user, clicks a star to change the rating
      this.ratingChange.emit(this.rating);
   }

  isAboveRating(index: number): boolean {
    // returns whether or not the selected index is above ,the current rating
    return index > this.rating;
    // function is called from the getColor function.
  }
}
