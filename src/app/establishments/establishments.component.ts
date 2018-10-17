import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from '../establishments.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Establishment } from '../establishment';
import * as mapboxgl from 'mapbox-gl';

declare var $: any;
@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css'],
  providers: [EstablishmentsService],
})
export class EstablishmentsComponent implements OnInit {

  establishments: Establishment[];

  cityConfig = {
    field: "city",
    type: "string",
    ismultiselect: true,
    title: "City"
  }
  statrYearConfig = {
    field: "startyear",
    type: "date",
    ismultiselect: false,
    title: "Start date"
  }
  nameConfig = { field: "name", title: "Name :" }
  postcodeConfig = { field: "postcode", title: "Post Code :" }
  addressConfig = { field: "address", title: "Address :" }
  multiselectSource: string[];
  yearSource: number[];

  currentPage: number = 0;
  pagesNumber: number = 0
  pageStartIndex = 0;
  pages: number[] = [];
  readonly rowCount = 12;
  constructor(private service: EstablishmentsService) { }

  ngOnInit() {
    this.service.getDataSource().subscribe(
      data => {
        this.refreshPagination(data);

        if (!this.multiselectSource) {
          this.multiselectSource = [];
          data.forEach(item => {
            if (!this.multiselectSource.includes(item.city))
              this.multiselectSource.push(item.city);
          });
          this.multiselectSource.sort();
        }
        if (!this.yearSource) {
          this.yearSource = [];
          data.forEach(item => {
            if (item.startyear != null && !this.yearSource.includes(item.startyear.getFullYear()))
              this.yearSource.push(item.startyear.getFullYear());
          });
          this.yearSource = this.yearSource.sort();
        }

        this.changePage(0);
      });
    this.service.search.subscribe(data => {
      this.refreshPagination(data);
      this.establishments = data.slice(0, this.rowCount);

    });
    this.service.pagechanged.subscribe(data => this.establishments = data);
  }

  private refreshPagination(data: any[]) {
    this.pages = [];
    this.currentPage = 0;
    this.pageStartIndex = 0;
    this.pagesNumber = Math.ceil((data.length / this.rowCount));
    for (let i = 0; i < (this.pagesNumber < 5 ? this.pagesNumber : 5); i++)
      this.pages[i] = i;
  }

  public changePage(index: number): void {
    this.currentPage = index;
    this.service.getData(index, this.rowCount);
  }

  public increasePageIndex() {
    this.pageStartIndex++;
    for (let i = 0; i < this.pages.length; i++) {
      let newIndex = i + this.pageStartIndex;
      if (newIndex !== this.pagesNumber)
        this.pages[i] = i + this.pageStartIndex;
    }
  }

  public decreasePageIndex() {
    this.pageStartIndex--;
    for (let i = 0; i < this.pages.length; i++) {
      let newIndex = i + this.pageStartIndex;
      if (newIndex >= 0)
        this.pages[i] = i + this.pageStartIndex;
    }
  }
}
