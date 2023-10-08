import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { PostService } from './chart.service';
// import { PostService } from 'projects/crud/src/app/post/post.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  public chartData: any[] = [];
  public chartLabels: string[] = [];
  public chartType: ChartType = 'bar';

  constructor(private postsService: PostService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe((posts: any[]) => {
      this.chartData = [
        {
          data: posts.map((post) => post.userId),
          label: 'User IDs',
        },
      ];
      this.chartLabels = posts.map((post) => post.id.toString());
    });
  }
}
