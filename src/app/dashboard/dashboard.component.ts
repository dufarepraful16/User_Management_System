import { Component, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexDataLabels
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartOptions!: ChartOptions;
  users: any[] = [];
  totalCount: number = 0;
  adminCount: number = 0;
  userCount: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.totalCount = this.users.length;
    this.adminCount = this.users.filter(user => user.role === 'Admin').length;
    this.userCount = this.users.filter(user => user.role === 'User').length;

  this.chartOptions = {
    series: [
      {
        name: 'Users',
        data: [this.totalCount, this.adminCount, this.userCount]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    title: {
      text: 'Users Distribution'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Total', 'Admin', 'Users']
    }
  };

  }

}
