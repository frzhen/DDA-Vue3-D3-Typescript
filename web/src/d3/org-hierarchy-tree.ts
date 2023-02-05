/**
 * @Author: Fred R. Zhen
 * @Date: 2023/2/5 22:12
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

export function createGraph() {

  const svg = d3.select('#org-tree')
    .append('svg')
    .attr('width', 1700)
    .attr('height', 600);

  const graph = svg.append('g')
    .attr('transform', 'translate(50, 50)');

  const tree = d3.tree()
    .size([1600, 500]);

  const colorOrdinal = d3.scaleOrdinal([
    '#6668aa',
    '#41D0F0',
    '#FC8C3C',
    '#28AE60',
    '#2980b9',
    '#E281EC',
  ])

  return {
    graph: graph,
    tree: tree,
    colorOrdinal: colorOrdinal

  }
}

export function updateGraph(data: any, graphItems: any) {

  const graph = graphItems.graph;
  const tree = graphItems.tree;
  const colorOrdinal = graphItems.colorOrdinal;

  // initialize by remove node and link
  graph.selectAll('.node').remove();
  graph.selectAll('.link').remove();
  graph.selectAll('.label').remove();



  const treeData = tree(d3.hierarchy(data));
  const treeDataArray = treeData.descendants()
  const nodes = graph.selectAll('.node')
    .data(treeDataArray);

  // update ordinal scale domain
  colorOrdinal.domain(treeDataArray.map((d: any) => d.data.departement));

  const links = graph.selectAll('.link')
    .data(treeData.links());

  links.enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#aaa')
    .attr('stroke-width', 2)
    .attr('d', d3.linkVertical()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
    );

  const enterNodes = nodes.enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

  enterNodes.append('rect')
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('fill', (d: any) => colorOrdinal(d.data.department))
    .attr('height', 30)
    .attr('width', (d: any) => d.data.name.length * 10 + 6)
    .attr('transform', (d: any) => {
      let x = (d.data.name.length * 10 + 6) / 2;
      return `translate(${-x}, -20 )`
    });

  enterNodes.append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text((d: any) => d.data.name)
    .style('font-size', 14);

  // filter out none department nodes

  const deptData = treeDataArray.filter((d: any) => {
   if ( d.depth == 1) {
     return d
   }
  })

  const deptNode = graph.selectAll('.label')
    .data(deptData);

  const enterDeptNode = deptNode.enter()
    .append('g')
    .attr('class', 'label')
    .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)

  enterDeptNode.append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#323D5E')
    .text((d: any) => d.data.department)
    .attr('x', 0)
    .attr('y', -40)
    .style('font-size', 16);
}
