import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexLegend,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexFill,
  ApexAnnotations,
  ApexXAxis,
} from "ng-apexcharts";
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxApexchartsModule,
    NzTabsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<PieChartOptions>;
  public columnChartOptions: Partial<ChartOptions>;

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
        text: "Quantity Chart"
      },
      xaxis: {
        categories: []
      }
    };

    this.pieChartOptions = {
      series: [],
      chart: {
        width: 600,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.columnChartOptions = {
      series: [
        {
          name: "My-series",
          data: []
        }
      ],
      chart: {
        height: 500,
        type: "line"
      },
      title: {
        text: "Sold Chart"
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
      this.chartData();
      this.pieChartData();
      this.columnChartData();
  }

  chartData() {
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

  pieChartData() {
    this.fashionService.getAllFashion().subscribe( data => {
      const categoryMap: { [key: string] :number} = {}

      data.forEach( (item: Fashion) => {
        if(categoryMap[item.category]) {
          categoryMap[item.category] += item.sold;
        } else {
          categoryMap[item.category] = item.sold;
        }
      })

      const categories = Object.keys(categoryMap);
      const sold = Object.values(categoryMap);

      // Cập nhật dữ liệu cho biểu đồ
      this.pieChartOptions = {
        ...this.pieChartOptions,
        series: sold,
        labels: categories,
      }
    })
  }

  columnChartData() {
    this.fashionService.getAllFashion().subscribe( data => {
      const categoryMap: { [key: string] :number} = {}

      data.forEach( (item: Fashion) => {
        if(categoryMap[item.category]) {
          categoryMap[item.category] += item.sold;
        } else {
          categoryMap[item.category] = item.sold;
        }
      })

      const categories = Object.keys(categoryMap);
      const sold = Object.values(categoryMap);

      // Cập nhật dữ liệu cho biểu đồ
      this.columnChartOptions = {
        ...this.columnChartOptions,
        series: [
          {
            name: "Số lượng sản phẩm",
            data: sold
          }
        ],
        xaxis: {
          categories: categories
        }
      }
    })
  }
}
