var num_bins = 20

var data = d3.range(1).map(d3.randomUniform(1));

var formatCount = d3.format(",.0f");

var svg = d3.select("svg"),
    margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .rangeRound([0, width]);

var bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(num_bins))
    (data);

var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([height, 0]);

var bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr("height", function(d) { return height - y(d.length); });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatCount(d.length); });

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
  .transition()
    .duration(500)
    .on("start", tick);

function tick() {
  // Push a new data point onto the back.
  data.push(d3.randomUniform()(1));
  // Redraw the graph
  d3.select(this)
      .attr("rect")
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", function(d) { return height - y(d.length); });
  
  // Redraw the line.
  /*
  d3.select(this)
      .attr("d", line)
      .attr("transform", null);
  // Slide it to the left.
  d3.active(this)
      .attr("transform", "translate(" + x(-1) + ",0)")
    .transition()
      .on("start", tick);
  // Pop the old data point off the front.
  data.shift();
  */
}