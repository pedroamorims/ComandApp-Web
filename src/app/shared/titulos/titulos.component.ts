import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})
export class TitulosComponent implements OnInit {
  @Input() titulo: string = '';

  constructor() { }

  ngOnInit() {
  }

}
