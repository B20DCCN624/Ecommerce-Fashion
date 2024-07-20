import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexStroke, NgxApexchartsModule } from 'ngx-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private fashionService: FashionService) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: []
        }
      ],
      chart: {
        height: 500,
        type: "area"
      },
      title: {
        text: "Category Chart"
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
      this.fetchData();
  }

  fetchData() {
    this.fashionService.getAllFashion().subscribe(data => {
      //lưu trữ tổng số lượng sản phẩm
      const categoryMap: { [key: string]: number } = {};

      // Tính tổng số lượng sản phẩm cho từng category
      data.forEach((item: Fashion) => {
        if (categoryMap[item.category]) {
          categoryMap[item.category] += item.quantity;
        } else {
          categoryMap[item.category] = item.quantity;
        }
      });

      // Chuyển đổi dữ liệu để phù hợp với cấu trúc của biểu đồ
      const categories = Object.keys(categoryMap);
      const quantities = Object.values(categoryMap);
      console.log(categories,quantities)

      // Cập nhật dữ liệu cho biểu đồ
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: "Số lượng sản phẩm",
            data: quantities
          }
        ],
        xaxis: {
          categories: categories
        }
      };
    })
  }
}
