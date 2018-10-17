import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Establishment } from './establishment';
import { EstablishmentDetail } from 'src/app/establishment-detail';
import * as moment from 'moment';

@Injectable({ providedIn: "root" })
export class EstablishmentsService {
  private dataSource: Establishment[];
  private currentFilter = new Map<string, [string, string, any[]]>();
  public search = new Subject<Establishment[]>();
  public pagechanged = new Subject<Establishment[]>();
  constructor(private http: HttpClient) {
  }
  public getDataSource(): Observable<Establishment[]> {
    return this.http.get<any[]>('./assets/establishment-data.json').pipe(map(data => {
      var arr = data.map(value => new Establishment(
        value.trcid,
        value.title,
        value.location.city,
        value.location.zipcode,
        value.location.adress,
        value.dates.hasOwnProperty('startdate') && value.dates.startdate ?
          moment(value.dates.startdate, "DD-MM-YYYY").toDate() : null));
      return arr;
    }));
  }

  getDetailById(id: string): Observable<EstablishmentDetail> {
    return this.http.get<any[]>('./assets/establishment-data.json').pipe(map(data => {
      var item = data.find(item => item.trcid == id);
      var detail = new EstablishmentDetail();
      detail.name = item.title;
      detail.fullAddress = item.location.adress + ', ' + item.location.zipcode + ', ' + item.location.city;
      detail.urls = item.hasOwnProperty('urls') ? item.urls : [];
      detail.media = item.hasOwnProperty('media') ? item.media.map(i => i.url) : [];
      console.log(JSON.stringify(detail));
      return detail;
    }));
  }
  simpleSearch(filter: any[], fname: string, operator): void {
    if (!filter || filter.length === 0) {
      if (this.currentFilter.has(fname + operator)) {
        this.currentFilter.delete(fname + operator);
      }
    }
    else
      this.currentFilter.set(fname + operator, [fname, operator, filter]);
    this.getFilteredSource((source) => { this.search.next(source) });
  }
  private getFilteredSource(emitaction: (obj: Establishment[]) => void): void {

    this.getDataSource().subscribe(data => {
      let filtered = [];
      let source: Establishment[] = data;
      this.currentFilter.forEach((value: [string, string, any[]], key: string) => {
        value[2].forEach(s => {
          if (value[1] === "StartWith")
            filtered = filtered.concat(source.filter(prop => prop[value[0]].startsWith(s)));
          if (value[1] === "equal") {
            filtered = filtered.concat(source.filter(prop => ((prop[value[0]] instanceof Date) ?
              (prop[value[0]] as Date).getFullYear() : prop[value[0]]) == s));
          }
        });
        source = filtered;
        filtered = [];
      });
      emitaction(source);
    });
  }

  getData(index: number, rowcount: number): void {
    this.getFilteredSource((source) => {
      this.pagechanged.next(source.slice(index * rowcount, (index + 1) * rowcount));
    });
  };
}



