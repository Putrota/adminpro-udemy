import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {


  @Input() data;

  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = '';


  constructor() { }

  ngOnInit() {

    console.log(this.data);

  }

}
