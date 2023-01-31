/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/25 23:49
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

const barColor = '#FC8C3C';
const highlightColor = '#41D0F0';
const textColor = '#323D5E';
const orderLabelColor = "#28AE60";
export function createBarChar(data: any) {
  const svg = d3.select('#barChart')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

  const margin = { top: 20, right: 20, bottom: 100, left: 100 };
  const graphWidth = 600 - margin.left - margin.right;
  const graphHeight = 600 - margin.top - margin.bottom;

  const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
  const yAxisGroup = graph.append('g');


  const min: number  = <number>(d3.min(data, (d: any) => d.orders) as unknown);
  const max: number  = <number>( d3.max(data, (d: any) => d.orders) as unknown);

  const y_scale = d3.scaleLinear()
    .domain([min-20, max])
    .range([graphHeight, 0]); // reverse the y-axis and graph scale

  // band scales
  const x_scale = d3.scaleBand()
    .domain(data.map((item: { name: any }) => item.name))
    .range([0, 500])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  // join the data to rects
  const rects = graph.selectAll('rect')
    .data(data);

  rects.attr('width', x_scale.bandwidth)
    .attr('width', x_scale.bandwidth)
    .attr('height', 0)
    .attr('y', graphHeight)
    .attr('fill', `${barColor}`)
    .attr('fill-opacity', 0.7)
    .attr('x', (d: any) => x_scale(d.name) as number)
    .transition().duration(1500) // transition
    .attr('y', (d: any) => y_scale(d.orders))
    .attr('height', (d: any) => graphHeight - y_scale(d.orders));

  rects.enter()
    .append('rect')
    .attr('width', x_scale.bandwidth)
    .attr('height', 0)
    .attr('y', graphHeight)
    .attr('fill', barColor)
    .attr('fill-opacity', 0.7)
    .attr('x', (d: any) => x_scale(d.name) as number)
    .transition().duration(1500) // transition
    .attr('y', (d: any) => y_scale(d.orders))
    .attr('height', (d: any) => graphHeight - y_scale(d.orders));

  // create and call the Axis
  const xAxis = d3.axisBottom(x_scale);
  const yAxis = d3.axisLeft(y_scale)
    .ticks(4)
    .tickFormat(d => d + ' orders');

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup.selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)')
    .attr('fill', textColor)
    .style('font-size', 14);

  yAxisGroup.selectAll('text')
    .attr('fill', textColor)
    .style('font-size', 14);

  // remove exit selection
  // rects.exit().remove();

  // event handlers
  const handleMouseOver: any = (d: any) => {
    d3.select(d.srcElement)
      .attr('fill', highlightColor);
  }

  const handleMouseOut: any = (d: any) => {
    d3.select(d.srcElement)
      .attr('fill', barColor);
  }

  const handleClick: any = (d: any) => {
    svg.append('text')
      .text(d.srcElement.__data__.orders)
      .attr('class', 'orders')
      .attr('y', parseFloat(d.srcElement.attributes.y.value) + margin.top - 5)
      .attr('x', (parseFloat(d.srcElement.attributes.x.value) + margin.left +
          parseFloat(d.srcElement.attributes.width.value) / 2))
      .attr('text-anchor', 'middle')
      .style('fill', orderLabelColor)
      .style('font-size', 16)
      .on('click', handleLabel);
  }

  const handleLabel: any = (d: any) => {
    d3.select(d.srcElement).remove();
  }

  // add events
  graph.selectAll('rect')
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)
    .on('click', handleClick);
}
