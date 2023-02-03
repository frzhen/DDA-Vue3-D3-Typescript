/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/4 00:38
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

export function createFitnessTracker(data: any) {
  const boxWidth = 560;
  const boxHeight = 400;
  const svg = d3.select('#line-graph')
    .append('svg')
    .attr('height', boxHeight)
    .attr('width', boxWidth)

  const margin = { top: 40, right: 20, bottom: 50, left: 100 };
  const graphWidth = boxWidth - margin.left - margin.right;
  const graphHeight = boxHeight - margin.top - margin.bottom;

  const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr( 'height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);




}
