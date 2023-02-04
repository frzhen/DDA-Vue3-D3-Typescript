/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/4 00:38
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

// export function removeGraph() {
//   d3.select('#line-graph').remove();
// }

export function createGraph() {
  // preparing data without using d3 library
  // let max_distance = 0;
  //
  // data.forEach((d: any) => {
  //   if (d.distance > max_distance) {
  //     max_distance = d.distance
  //   }
  // });
  // then:
  // the domain for xScale: [data[0].date, data[data.length - 1].date]
  // the domain for yScale: [0, max_distance]
  // However, all these can be replaced using d3 method:
  // extent for xScale domain
  // max for yScale
  const boxWidth = 800;
  const boxHeight = 600;

  const svg = d3.select('#line-graph')
    .append('svg')
    .attr('height', boxHeight)
    .attr('width', boxWidth)

  const margin = { top: 40, right: 20, bottom: 50, left: 100 };
  const graphWidth = boxWidth - margin.left - margin.right;
  const graphHeight = boxHeight - margin.top - margin.bottom;

  const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // set scales
  const xScale = d3.scaleTime()
    .range([0, graphWidth]);

  const yScale = d3.scaleLinear()
    .range([graphHeight, 0]);

  const xAxis = d3.axisBottom(xScale)
    .ticks(8);
  const yAxis = d3.axisLeft(yScale)
    .ticks(8);

  const xAxisGroup = graph.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${graphHeight})`);

  const yAxisGroup = graph.append('g')
    .attr('class', 'y-axis');


  // create line generator
  const line = d3.line()
    .x(function(d: any){ return xScale(new Date(d.date))})
    .y(function(d: any){ return yScale(d.distance)})

  // create chart path element
  const linePath = graph.append('path');

  return {
    graph: graph,
    xScale: xScale,
    yScale: yScale,
    xAxis: xAxis,
    yAxis: yAxis,
    xAxisGroup: xAxisGroup,
    yAxisGroup: yAxisGroup,
    line: line,
    linePath: linePath
  };
}


export function updateGraph(data: any, graphItems: any, linePathFill: string) {
  const graph = graphItems.graph;
  const xScale = graphItems.xScale;
  const yScale = graphItems.yScale;
  const xAxis = graphItems.xAxis;
  const yAxis = graphItems.yAxis;
  const xAxisGroup = graphItems.xAxisGroup;
  const yAxisGroup = graphItems.yAxisGroup;
  const line = graphItems.line;
  const linePath = graphItems.linePath;

  xScale.domain(<[Date, Date]>d3.extent(data, (d: any) => new Date(d.date)));
  yScale.domain([0,
    <number>d3.max<[number, number], number>(data, (d: any) => d.distance)]);

  // ************ draw axes **********
  xAxis.tickFormat(d3.timeFormat('%b %d') as any);
  yAxis.tickFormat((d: any) => d + " m" );

  const lineColor = '#323D5E';
  const lineWidth = 2;

  xAxisGroup.call(xAxis);

  xAxisGroup.selectAll('path')
    .attr('stroke', lineColor )
    .attr('stroke-width', lineWidth);

  xAxisGroup.selectAll('line')
    .attr('stroke', lineColor )
    .attr('stroke-width', lineWidth);

  xAxisGroup.selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)')
    .style('color', '#28AE60')
    .style('font-size', 16);

  yAxisGroup.call(yAxis);
  yAxisGroup.selectAll('path')
    .attr('stroke', lineColor )
    .attr('stroke-width', lineWidth);

  yAxisGroup.selectAll('line')
    .attr('stroke', lineColor )
    .attr('stroke-width', lineWidth);

  yAxisGroup.selectAll('text')
    .style('color', '#FC8C3C')
    .style('font-size', 16);


  // plot line path
  linePath.data([data])
    .attr('fill', linePathFill)
    .attr('stroke', '#41D0F0')
    .attr('stroke-width', 2)
    .attr('d', line);



  // ******* plot chart data *********
  const circles = graph.selectAll('circle').data(data);

  // update old circles
  circles
    .attr('cx', (d: any) => xScale(new Date(d.date)))
    .attr('cy', (d :any) => yScale(d.distance));

  // add new circles
  circles.enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', (d: any) => xScale(new Date(d.date)))
    .attr('cy', (d :any) => yScale(d.distance))
    .attr('fill', '#E281EC');

  circles.exit().remove();
}
