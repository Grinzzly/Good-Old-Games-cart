import { Component } from '@angular/core';

@Component({
  selector: 'jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent {
  public bubbleIt(e) {
    e.preventDefault();

    e.target.classList.remove('animate');
    e.target.classList.add('animate');

    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  }
}
