/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/27 17:38
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";
import {arc} from "d3";
import sharedWorkerConstructor from "*?sharedworker";


export function createDonutChart(data: any) {

  const dims = {
    height: 300,
    width: 300,
    radius: 150
  };

  const cent = {
    x: (dims.width / 2 + 80 ),
    y: (dims.height /2 + 80 )
  };

  const svg = d3.select('#donutChart')
    .append('svg')
    .attr('width', dims.width + 150)
    .attr('height', dims.height + 150)

  const graph = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`);

  const pie = d3.pie()
    .sort(null)
    .value((d: any) => d.amount);

  const arcPath: any = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius - 50);

  // custom color pattern
  const colorRange = [
    '#6668aa',
    '#323D5E',
    '#41D0F0',
    '#FC8C3C',
    '#28AE60',
    '#2980b9',
    '#E281EC',
    '#5E6484'
  ]
  const arcColor = d3.scaleOrdinal(colorRange)
    .domain(data.map((d: any) => d.name));

  // custom tween for transition
  const arcTweenEnter: any = (d: any) => {
    let i = d3.interpolate(d.endAngle, d.startAngle)

    return function(ticker: any) {
      d.startAngle = i(ticker);
      return arcPath(d);
    }
  }
  const arcTweenExit: any = (d: any) => {
    let i = d3.interpolate(d.startAngle, d.endAngle);

    return function(ticker: any) {
      d.startAngle = i(ticker);
      return arcPath(d);
    }
  }
  // use function keyword  to allow use of 'this'
  // function  arcTweenUpdate(d: any) {
  //   let i = d3.interpolate(this._current, d);
  //   this._current = i(1);
  //   return function(ticker: any) {
  //     return arcPath(i(ticker));
  // }

  const paths = graph.selectAll('path').data(pie(data));

  paths.exit()
    .transition().duration(1500)
    .attrTween('d', arcTweenExit)
    .remove();

  paths.transition().duration(1500)
    .attrTween('d', arcTweenEnter);

  paths.enter()
    .append('path')
    .attr('stroke', '#fff')
    .attr('stroke-width', 0)
    .attr('fill', (d: any)=> arcColor(d.data.name))
    .attr('fill-opacity', 0.7)
    .transition().duration(1500)
    .attrTween('d', arcTweenEnter);

}
