import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  @Output() toggleLoading = new EventEmitter<any>();

  wordSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  words: Observable<any> = of([]);
  inputValue: string = 'hello';
  formInput: FormControl = new FormControl('we is champion.');
  dataCorrect: any;

  ngOnInit(): void {
    this.parseStringToArray(this.formInput.value);

    this.formInput.valueChanges.subscribe((value: string) => {
      this.parseStringToArray(value);
      this.toggleLoadingFunc(true)
    });
  }

  checkValidInput() {
    this.http.post(environment.Endpoint, {
      entries: this.wordSubject.value
    }).toPromise().then((res: any) => {
      this.wordSubject.next(res.entries || [])
      this.toggleLoadingFunc()
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
        if (!work) {
          continue;
        }
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        wordsFormatted.push({text: work, error: 0, specialChar: format.test(work)})
      }
      this.wordSubject.next(wordsFormatted);
    }
  }

  get WordObservable(): Observable<any> {
    return this.wordSubject.asObservable()
  }

  showAutoCorrect(data: any) {
    if (data.error) {
      this.dataCorrect = data;
    }
  }

  hideAutoCorrect() {
    this.dataCorrect = null;
  }

  toggleLoadingFunc(value: boolean = true) {
    this.toggleLoading.next(value)
  }


}
