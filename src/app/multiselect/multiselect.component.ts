import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { EstablishmentsService } from '../establishments.service';

declare var $: any;
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit, AfterViewInit {

  @Input() source: any[];
  @Input() config: any;
  @ViewChild('multiselector') multiselector: ElementRef;
  private fieldName: string;
  constructor(private service: EstablishmentsService) { }

  ngOnInit() {
    this.fieldName = this.config.field;
    setTimeout(() => {
      if (this.multiselector.nativeElement && this.source) {
        $(this.multiselector.nativeElement).selectpicker('refresh');
      }
      }, 500);
  }

  ngAfterViewInit(): void {
    $(this.multiselector.nativeElement).on('change', (e) => {
      var selected = $(e.currentTarget).val();
      this.service.simpleSearch(selected, this.fieldName, "equal");
    });
  }
}
