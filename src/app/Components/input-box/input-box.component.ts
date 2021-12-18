import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  
  constructor() { 
    
  }
  values = '';
  words = '';
  removespace= '';
  characters= '';
  showRightIcon: boolean = false;

  ngOnInit(): void {
  }
 
  onKey(value: string) {
    // count words in the value
      this.words = value.split(' ').length.toString();
      this.removespace = value.replace(/\s/g, '');
      this.characters = this.removespace.length.toString();
      if (value.length > 0) {
        this.showRightIcon = true;
      }
  }

}
