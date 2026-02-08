// Example Code from Scott Murray's "Interactive Data Visualization for the Web" book

// Width and height of Scatterplot
			var w = 500;
			var h = 100;
			
			var penglings = "penglings.csv"; // Path to CSV file containing data

            // Load data from CSV file
			
            d3.csv(penglings, function(data) {
                dataset = data;
                console.log(dataset);
            });

            // Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
            
            var padding = 20; // Padding for x-y axes
            
            var x_scale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d) { return d.flipper_length_mm; })]) // Set x-axis domain based on max flipper length
                            .range([padding, w - padding]);
            
            var y_scale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d) { return d.body_mass_g; })]) // Set y-axis domain based on max body mass
                            .range([h - padding, padding]); // Invert y-axis range to have origin at bottom-left
            
            var r_scale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d) { return d.bill_length_mm; })]) // Set radius domain based on max bill length
                            .range([2, 8]); // Set radius range for circles
            
            var color = d3.scaleOrdinal(d3.schemeDark2) // Create color scale using D3's built-in categorical color scheme
                            .domain(dataset.map(d => d.species)); // Set color scale domain to unique species in dataset

            var categories = dataset.map(d=>d.species)

			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) { // d is the current data point (e.g., [5, 20])
			   		return x_scale(d.flipper_length_mm);    // d.flipper_length_mm is the x-coordinate of the data point
			   })
			   .attr("cy", function(d) {
			   		return y_scale(d.body_mass_g);   // d.body_mass_g is the y-coordinate of the data point
			   })
			   .attr("r", function(d) { 
                return r_scale(d.bill_length_mm); // Set radius to bill_length_mm scaled by r_scale
                })
                .attr("fill",d=>color(d.species)); // Set fill color based on species using color scale
            
            var x_axis = d3.axisBottom(x_scale) // Create x-axis generator
                            .scale(x_scale) // Set x-axis scale to x_scale
                            .ticks(6); // Set number of ticks on x-axis
            
            var y_axis = d3.axisLeft(y_scale) // Create y-axis generator
                            .scale(y_scale) // Set y-axis scale to y_scale
                            .ticks(4); // Set number of ticks on y-axis
            
            svg.append("g") // Append group element for x-axis
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (h - padding) + ")") // Position x-axis at the bottom of the SVG
               .call(x_axis); // Call x-axis generator to create x-axis
            
            svg.append("g") // Append group element for y-axis
               .attr("class", "y axis")
               .attr("transform", "translate(" + padding + ",0)") // Position y-axis on the left side of the SVG
               .call(y_axis); // Call y-axis generator to create y-axis
