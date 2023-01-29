/**
 * @Author: Fred R. Zhen
 * @Date: 2023/1/27 17:38
 * @Email: fred.zhen@gmail.com
 */
import * as d3 from "d3";

// event handlerS


export function createDonutChart(data: any) {

  const dims = {
    height: 400,
    width: 400,
    radius: 150
  };

  const cent = {
    x: (dims.width / 2 + 80 ),
    y: (dims.height /2 + 80 )
  };

  const transition_interval = 1500;
  const svg = d3.select('#donutChart')
    .append('svg')
    .attr('width', dims.width + 150)
    .attr('height', dims.height + 150)

  const graph = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`);

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

  const pie = d3.pie()
    .sort(null)
    .value((d: any) => d.amount);

  const arcPath: any = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius - 50);

  const handleMouseOver: any = (d: any) => {
    d3.select(d.srcElement)
      .transition('changeSliceFill').duration(500)
      .attr('fill', '#000')
      .attr('stroke', '#41D0F0')
      .attr('stroke-width', 3);
  }

  const handleMouseOut: any = (d: any) => {
    d3.select(d.srcElement)
      .transition('changeSliceFill').duration(500)
      .attr('fill', colorRange[d.srcElement.__data__.index])
      .attr('stroke', '#fff')
      .attr('stroke-width', 0);
  }

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

  const paths = graph.selectAll('path').data(pie(data));

  paths.exit()
    .transition().duration(transition_interval)
    .attrTween('d', arcTweenExit)
    .remove();

  paths.transition().duration(transition_interval)
    .attrTween('d', arcTweenEnter);

  paths.enter()
    .append('path')
    .attr('stroke', '#fff')
    .attr('stroke-width', 0)
    .attr('fill', (d: any)=> arcColor(d.data.name))
    .attr('fill-opacity', 0.7)
    .transition().duration(transition_interval)
    .attrTween('d', arcTweenEnter)
    .attr('class', 'donut-slice');

  // add events
  graph.selectAll('path')
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut);

  const annotation_offset = 80;
  const horizontal_line_length = 50;
  const annotation_connector_offset = annotation_offset - 5;
  const annColor = '#F98E6E';

  const annGroup = svg.append('g')
    .attr('transform', `translate(${cent.x}, ${cent.y})`);
  const annotations = annGroup.selectAll('.donut-slice').data(pie(data));

  const annotationDraws = annotations.enter();

  // Annotation Functions
  const drawText = () => {
    annotationDraws
      .append('text')
      .text((d: any) => `${d.data.name}: ${d.data.amount}`)
      .attr("transform", (d: any) => {
        const centroid = arcPath.centroid(d);
        if (centroid[0] > 0) {
          centroid[0] += annotation_offset
        } else if (centroid[0] < 0) {
          centroid[0] -= annotation_offset
        }
        if (centroid[1] > 0) {
          centroid[1] += annotation_offset
        } else if (centroid[1] < 0) {
          centroid[1] -= annotation_offset
        }
        return `translate(${centroid})`
      })
      .style('text-anchor', 'middle')
      .style('font-size', 14);
  }

  // draw horizontal lines of annotation lines
  const drawHorizontalLine = () => {
    annotationDraws
      .append('line')
      .style("stroke", `${annColor}`)
      .style("stroke-width", 1)
      .attr("x1", (d: any) => arcPath.centroid(d)[0])
      .attr("y1", (d: any) => arcPath.centroid(d)[1])
      .attr("x2", (d: any) => {
        let current_x = arcPath.centroid(d)[0];
        if (current_x > 0) {
          current_x += horizontal_line_length;
        } else if (current_x < 0) {
          current_x -= horizontal_line_length;
        }
        return  current_x;
      })
      .attr("y2", (d: any) => arcPath.centroid(d)[1]);
  }

  // draw annotation line connectors
  const drawLineConnector = () => {
    annotations.enter()
      .append('line')
      .style("stroke", `${annColor}`)
      .style("stroke-width", 1)
      .attr("x1", (d: any) => {
        let current_x = arcPath.centroid(d)[0];
        if (current_x > 0) {
          current_x += horizontal_line_length;
        } else if (current_x < 0) {
          current_x -= horizontal_line_length;
        }
        return  current_x;
      })
      .attr("y1", (d: any) => arcPath.centroid(d)[1])
      .attr("x2", (d: any) => {
        let current_x = arcPath.centroid(d)[0];
        if (current_x > 0) {
          current_x += annotation_connector_offset;
        } else if (current_x < 0) {
          current_x -= annotation_connector_offset;
        }
        return  current_x;
      })
      .attr("y2", (d: any) => {
        let current_y = arcPath.centroid(d)[1];
        if (current_y > 0) {
          current_y = current_y + annotation_connector_offset - 10;
        } else if (current_y < 0) {
          current_y -= annotation_connector_offset}
        return  current_y;
      });
  }
  const annFunc = () => {
    drawText();
    drawHorizontalLine();
    drawLineConnector();
  }
  // add annotation to the donut chart after pie rendering
  setTimeout(() => {
    annFunc();
  }, transition_interval);

}
