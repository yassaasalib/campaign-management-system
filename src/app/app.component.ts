import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { Campaign } from './campaign.model';
import { CAMPAIGNS } from './campaign-data';
import { faXmark, faCheck, faBarsFilter } from '@fortawesome/sharp-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
})

export class AppComponent implements AfterViewInit {
  title = 'campaign-management-system';
  displayedColumns: string[] = ['name', 'status', 'startDate', 'endDate', 'budget'];
  dataSource: MatTableDataSource<Campaign>;
  data = CAMPAIGNS;
  faCheck: IconProp = faCheck;
  faBarsFilter: IconProp = faBarsFilter;
  faXmark: IconProp = faXmark;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(DateFilterComponent) dateFilterComponent!: DateFilterComponent;

  // currentFilter: string = '';

  applicationOpen: boolean = false;

  openApplication() {
    this.applicationOpen = true;
  }

  clearFilter() {
    this.dateFilterComponent.range.reset();
  }
  
  closeApplication() {
    this.applicationOpen = false;
  }

  constructor() {
    (window as any)["addCampaigns"] = this.addCampaigns.bind(this);
    this.dataSource = new MatTableDataSource(this.data);
    this.loadData();
  }


  loadData() {
    this.validateDate();
    this.setStatus();
    this.dataSource = new MatTableDataSource(this.data);
  }

  currentFilter: string = '';

  // applicationOpen: boolean = false;

  // openApplication() {
  //   this.applicationOpen = true;
  // }

  // closeApplication() {
  //   this.applicationOpen = false;
  // }

  applyFilter(filterValue: string) {
    this.currentFilter = filterValue;
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setStatus() {
    this.data = this.data.map(campaign => ({
      ...campaign,
      status: new Date() >= new Date(campaign.startDate) && new Date() <= new Date(campaign.endDate) ? 'Active' : 'Inactive'
    }));
  }

  validateDate() {
    this.data = this.data.filter(campaign => campaign.startDate <= campaign.endDate);
  }

  addCampaigns(campaign: Campaign[]) {
    this.data = this.data.concat(campaign);
    this.loadData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  //   this.dateFilterComponent.range.valueChanges.subscribe(
  //     ({ start, end }) => {
  //       this.dataSource.data = this.data.filter(campaign => {
  //         let startDate = new Date(campaign.startDate);
  //         let endDate = new Date(campaign.endDate);

  //         if (start && startDate <= start) {
  //           return false;
  //         }

  //         if (end && endDate >= end) {
  //           return false;
  //         }

  //         return true;
  //       })
  //     }
  //   )
  // }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.dateFilterComponent) {
      this.dateFilterComponent.range.valueChanges.subscribe(({ start, end }) => {
        this.dataSource.data = this.data.filter(campaign => {
          let startDate = new Date(campaign.startDate);
          let endDate = new Date(campaign.endDate);

          if (start && startDate <= start) {
            return false;
          }
          if (end && endDate >= end) {
            return false;
          }

          return true;
        });
      });
    }
  }

}
