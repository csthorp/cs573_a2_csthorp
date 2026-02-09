// Example Code from Scott Murray's "Interactive Data Visualization for the Web" book

// Penglings Scatter Plot in D3

const w = 500;
const h = 300;    
const padding = 40;

const penglings = "penglings.csv";

const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

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
    .domain([0, d3.max(clean, d => d.flipper_length_mm)])
    .range([padding, w - padding]);

  const y_scale = d3.scaleLinear()
    .domain([0, d3.max(clean, d => d.body_mass_g)])
    .range([h - padding, padding]);

  const r_scale = d3.scaleLinear()
    .domain([0, d3.max(clean, d => d.bill_length_mm)])
    .range([2, 8]);

  const species = Array.from(new Set(clean.map(d => d.species)));

  const color = d3.scaleOrdinal()
    .domain(species)
    .range(d3.schemeDark2);

  svg.selectAll("circle")
    .data(clean)
    .enter()
    .append("circle")
    .attr("cx", d => x_scale(d.flipper_length_mm))
    .attr("cy", d => y_scale(d.body_mass_g))
    .attr("r", d => r_scale(d.bill_length_mm))
    .attr("fill", d => color(d.species));

  const x_axis = d3.axisBottom(x_scale).ticks(6);
  const y_axis = d3.axisLeft(y_scale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${h - padding})`)
    .call(x_axis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${padding},0)`)
    .call(y_axis);

}).catch(err => {
  console.error("Failed to load CSV:", err);
});