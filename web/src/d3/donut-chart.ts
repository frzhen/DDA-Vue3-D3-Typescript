/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/27 17:38
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

export function createDonutChart(data: any) {
  const svg = d3.select('#donutChart')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

  svg.append("rect").text(data[0].name);

}
