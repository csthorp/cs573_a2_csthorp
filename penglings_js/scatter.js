// Example Code from Scott Murray's "Interactive Data Visualization for the Web" book

// Penglings Scatter Plot in D3

const w = 700; // set the width and height of the SVG canvas
const h = 500;    
const padding = 40; // space for axes and labels

const margin = { top: 20, right: 20, bottom: 60, left: 70 }; // space for axes and labels
const width = w - margin.left - margin.right; // actual width of the plotting area
const height = h - margin.top - margin.bottom; // actual height of the plotting area

const penglings = "penglings.csv";

const svg = d3.select("body") // select the body element to append the SVG canvas
  .append("svg") // set the width and height of the SVG canvas
  .attr("width", w)
  .attr("height", h);

const g = svg.append("g") // group to hold the plot area
  .attr("transform", `translate(${margin.left},${margin.top})`); // move the plot area to account for margins

d3.csv(penglings).then(data => { // Convert numeric columns from strings -> numbers
    console.log("raw rows:", data.length, data[0]); // log the number of rows and the first row to check the data structure

const dataset = data.map(d => ({ // convert data to numeric values (as needed)
    species: d.species, // keep species as a string for coloring
    flipper_length_mm: +d.flipper_length_mm, // convert to number
    body_mass_g: +d.body_mass_g, // convert to number
    bill_length_mm: +d.bill_length_mm // convert to number
  }));

  const clean = dataset.filter(d => // filter out rows with missing or invalid data
    Number.isFinite(d.flipper_length_mm) &&
    Number.isFinite(d.body_mass_g) &&
    Number.isFinite(d.bill_length_mm)
  );

  const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")     // allows free placement
      .style("background", "white")      // tooltip background color
      .style("border", "1px solid #ccc") // light border
      .style("padding", "6px")           // spacing inside box
      .style("border-radius", "4px")     // rounded corners
      .style("pointer-events", "none")   // prevents flickering issues
      .style("opacity", 0);              // hidden by default

  const x_scale = d3.scaleLinear() // set the domain to start at 170 to give some padding on the left side
        .domain([170, d3.max(clean, d => d.flipper_length_mm)])
        .nice()
        .range([0, width]);

const y_scale = d3.scaleLinear() // set the domain to start at 2500 to give some padding on the bottom
        .domain([2500, d3.max(clean, d => d.body_mass_g)])
        .nice()
        .range([height, 0]);

  const r_scale = d3.scaleSqrt() // set the domain to start at 0 so that the smallest circles are visible
        .domain(d3.extent(clean, d => d.bill_length_mm))
        .range([2, 12]); // adjust the range to make the circles larger and more visible
  
const sizeLegendValues = [35, 40, 45, 50, 55];
const maxR = r_scale(d3.max(sizeLegendValues)); // calculate the maximum radius for the size legend based on the largest value in the legend
const rowH = maxR * 2 + 8; // calculate the height of each row in the size legend based on the maximum radius and some padding

const sizeLegend = g.append("g")
  .attr("class", "size-legend")
  .attr("transform", `translate(${width - 70}, ${185})`); // position the size legend in the top-right corner

sizeLegend.append("text") // add a title for the size legend
  .attr("x", 0)
  .attr("y", -8)
  .attr("font-weight", "bold")
  .attr("font-size", "12px")
  .text("Bill Length (mm)");

const rows = sizeLegend.selectAll(".size-row") // create a group for each row in the size legend
  .data(sizeLegendValues)
  .enter()
  .append("g")
  .attr("class", "size-row")
  .attr("transform", (d, i) => `translate(0, ${i * rowH})`);

rows.append("circle") // add circles to represent the size legend values
  .attr("cx", maxR)
  .attr("cy", maxR)
  .attr("r", d => r_scale(d)) 
  .attr("fill", "none")
  .attr("stroke", "#555");

rows.append("text") // add text labels for each size legend value
  .attr("x", maxR * 2 + 10)
  .attr("y", maxR + 4)
  .attr("font-size", "11px")
  .text(d => d);
                    
  const species = Array.from(new Set(clean.map(d => d.species)));

  const color = d3.scaleOrdinal() // create a color scale for the species
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
    .attr("opacity", 0.75)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "orange"); // "this" refers to the actual SVG circle being hovered
      tooltip
        .style("opacity", 1) // make tooltip visible
        .html(`
          Species: ${d.species}<br>
          Flipper: ${d.flipper_length_mm} mm<br>
          Mass: ${d.body_mass_g} g<br>
          Bill: ${d.bill_length_mm} mm
        `); // insert html into tooltip
            // using template strings for injecting data values
    })
    .on("mousemove", function (event) { // fires continuously while the mouse moves
      tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", function (event, d) { // restores original style and color when mouse leaves circle
      d3.select(this).attr("fill", color(d.species));
      tooltip.style("opacity", 0);
    });

  const x_axis = d3.axisBottom(x_scale) // set the number of ticks to 6 for better readability
        .ticks(6);
  const y_axis = d3.axisLeft(y_scale) // set the number of ticks to 5 for better readability
        .ticks(5);

  g.append("g") // append x axis
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`) // move the x axis to the bottom of the plot area
    .call(d3.axisBottom(x_scale).tickFormat(d3.format(","))); // format x-axis ticks with commas for thousands

  g.append("g") // append y axis
    .attr("class", "y axis")
    .call(d3.axisLeft(y_scale).ticks(5).tickFormat(d3.format(","))); // format y-axis ticks with commas for thousands

  g.append("text") // x-axis label
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Flipper Length (mm)");

  g.append("text") // y-axis label
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Body Mass (g)");

   g.append("text") // title
    .attr("x", width / 2)
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text("Penglings Scatter Plot");
  
  const legend = g.append("g") // create a group for the legend
    .attr("class", "legend")
    .attr("transform",`translate(${width - 70},
          ${height - species.length * 22 - 8})`); // position the legend in the bottom-right corner
      
  const legendItem = legend.selectAll(".legend-item") // create a group for each legend item
      .data(species)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 22})`); // space out legend items vertically
  
  legendItem.append("rect") // add a colored square for each legend item
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => color(d))
      .attr("opacity", 0.75);
    
  legendItem.append("text") // add text labels for each legend item
      .attr("x", 20)
      .attr("y", 11)
      .text(d => d)
      .attr("font-size", "12px");

}).catch(err => {
  console.error("Failed to load CSV:", err); // handle errors in loading the CSV file
});
