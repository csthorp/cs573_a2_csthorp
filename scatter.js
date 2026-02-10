// Example Code from Scott Murray's "Interactive Data Visualization for the Web" book

// Penglings Scatter Plot in D3

const w = 700;
const h = 500;    
const padding = 40;

const margin = { top: 20, right: 20, bottom: 60, left: 70 };
const width = w - margin.left - margin.right;
const height = h - margin.top - margin.bottom;

const penglings = "penglings.csv";

const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv(penglings).then(data => { // Convert numeric columns from strings -> numbers
    console.log("raw rows:", data.length, data[0]);

const dataset = data.map(d => ({
    species: d.species,
    flipper_length_mm: +d.flipper_length_mm,
    body_mass_g: +d.body_mass_g,
    bill_length_mm: +d.bill_length_mm
  }));

  // Remove rows with missing values
  const clean = dataset.filter(d =>
    Number.isFinite(d.flipper_length_mm) &&
    Number.isFinite(d.body_mass_g) &&
    Number.isFinite(d.bill_length_mm)
  );

  const x_scale = d3.scaleLinear()
        .domain([170, d3.max(clean, d => d.flipper_length_mm)])
        .nice()
        .range([0, width]);

const y_scale = d3.scaleLinear()
        .domain([2500, d3.max(clean, d => d.body_mass_g)])
        .nice()
        .range([height, 0]);

  const r_scale = d3.scaleSqrt()
        .domain([0, d3.max(clean, d => d.bill_length_mm)])
        .range([2, 12]);
                    
  const species = Array.from(new Set(clean.map(d => d.species)));

  const color = d3.scaleOrdinal()
    .domain(species)
    .range(d3.schemePaired); // play around with different color schemes

  g.selectAll("circle")
    .data(clean)
    .enter()
    .append("circle")
    .attr("cx", d => x_scale(d.flipper_length_mm))
    .attr("cy", d => y_scale(d.body_mass_g))
    .attr("r",  d => r_scale(d.bill_length_mm))
    .attr("fill", d => color(d.species))
    .attr("opacity", 0.75); // add opacity to make overlapping points more visible

  const x_axis = d3.axisBottom(x_scale)
        .ticks(6);
  const y_axis = d3.axisLeft(y_scale)
        .ticks(5);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x_scale));

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y_scale).ticks(5).tickFormat(d3.format(",")));

  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Flipper Length (mm)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Body Mass (g)");

   g.append("text")
    .attr("x", width / 2)
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text("Penglings Scatter Plot");
  
  const legend = g.append("g")
    .attr("class", "legend")
    .attr(
      "transform",
      `translate(${width - 120}, ${height - species.length * 22 - 10})`
    );
      
  const legendItem = legend.selectAll(".legend-item")
      .data(species)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 22})`);
  
  legendItem.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => color(d))
      .attr("opacity", 0.75);
    
  legendItem.append("text")
      .attr("x", 20)
      .attr("y", 11)
      .text(d => d)
      .attr("font-size", "12px");

}).catch(err => {
  console.error("Failed to load CSV:", err);
});