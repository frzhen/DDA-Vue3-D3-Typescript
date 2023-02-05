/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/5 17:55
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";
export function createGraph() {
 const svg = d3.select('#circlePacking')
   .append('svg')
   .attr('width', 1060)
   .attr('height', 800);

 const graph = svg.append('g')
   .attr('transform', 'translate(50, 50)');

 const stratify = d3.stratify()
   .id((d: any) => d.name)
   .parentId((d: any) => d.parent);

 const pack = d3.pack()
   .size([960, 700])
   .padding(5);

 const opacityOrdinal = d3.scaleOrdinal([0.2, 0.5, 0.9]);

  return {
    svg: svg,
    graph: graph,
    stratify: stratify,
    pack: pack,
    opacityOrdinal: opacityOrdinal,
  };
}

export function updateGraph(data: any, graphItems: any){
  const svg = graphItems.svg;
  const graph = graphItems.graph;
  const stratify = graphItems.stratify;
  const pack = graphItems.pack;
  const opacityOrdinal = graphItems.opacityOrdinal;

  const rootNode = stratify(data)
    .sum((d: any) => d.amount);

  const bubbleData = pack(rootNode).descendants();

  // join data and add group for each node
  const nodes = graph.selectAll('g')
    .data(bubbleData)
    .enter()
    .append('g')
    .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

  nodes.append('circle')
    .attr('r', (d: any) => d.r)
    .attr('fill', '#41D0F0')
    .attr('fill-opacity', (d: any) => opacityOrdinal(d.depth));

  nodes.filter((d: any) => !d.children)
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('fill', 'white')
    .style('font-size', (d: any) => d.value * 5 )
    .text((d: any) => d.data.name);
}
