import {Component, ContentChild, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounce} from 'lodash'
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  constructor(private http: HttpClient) {}

  wordSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  words: Observable<any> = of([]);
  showRightIcon: boolean = false;
  inputValue: string = 'hello';

  ngOnInit(): void {
    let words = this.inputValue.split(' ')
    let wordFormatted = [];
    for (let word of words) {
      wordFormatted.push({
        text: word,
        error: 0
      })
    }
    this.wordSubject.next(wordFormatted);

  }

  onKey() {
    this.parseStringToArray(this.inputValue)
  }

  checkValidInput() {
    console.log(123)
    this.http.post(environment.Endpoint, {
      entries: this.wordSubject.value
    }).toPromise().then((res: any) => {
      console.log(res)
      this.wordSubject.next(res.entries || [])
    })
  }

  deleteInput() {
    this.inputValue = this.inputValue.slice(0, -1);
    this.parseStringToArray(this.inputValue)
  }

  parseStringToArray(data: string) {
    if (data) {

      let words = data.split(' ');
      let wordsFormatted = [];
      for (let work of words) {
        wordsFormatted.push({text: work, error: 0});
      }
      this.wordSubject.next(wordsFormatted);
      // if (pTag?.innerText) {
      //   pTag.innerText = '';
      // }
    }
  }

  get WordObservable(): Observable<any> {
    return this.wordSubject.asObservable()
  }

}
