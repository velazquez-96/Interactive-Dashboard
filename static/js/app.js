
// Function to build barchart
function barChart(Sampleid) {
    d3.json("../../data.json").then(function (data) {
        console.log(data);
        // Filter Data according to id
        let filteredDataBar = data.samples.filter(x => x.id === Sampleid.toString())
        //console.log(filteredData)

        // Get first 10 elements 
        let sample_values = filteredDataBar[0].sample_values.slice(0, 10).reverse()
        //console.log(sample_values);

        // Add a prefix to each of the elements
        let otu_ids = filteredDataBar[0].otu_ids.slice(0, 10).reverse().map(el => {
            return el = `OTU ${el}`
        });
        //console.log(otu_ids)
        let otu_labels = filteredDataBar[0].otu_labels.slice(0, 10);
        //console.log(otu_labels);

        // Define trace
        let trace1 = {
            x: sample_values,
            y: otu_ids,
            type: 'bar',
            marker: {
                color: '#027bce',
            },
            orientation: 'h',
            text: otu_labels
        }
        //Define data
        let plotData = [trace1];

        //Define layout
        let layout1 = {
            xaxis: {
                showticklabels: true,
                showgrid: true
            },
            height: 500,
            width: 400,
            margin: {
                t: 0,
                r: 0,
                l: 150
            }
        }

        // Responsiveness from the chart
        let config = { responsive: true }

        // Display chart
        Plotly.newPlot("bar", plotData, layout1, config);

    });
}

function bubbleChart(Sampleid) {
    d3.json("../../data.json").then(function (data) {
        // Filter Data according to id
        let filteredDataBb = data.samples.filter(x => x.id === Sampleid.toString())

        let sample_values_b = filteredDataBb[0].sample_values;
        //console.log(sample_values_b);
        let otu_ids_b = filteredDataBb[0].otu_ids;
        //console.log(otu_ids_b);
        let otu_labels_b = filteredDataBb[0].otu_labels;
        //console.log(otu_labels_b);

        //Define trace
        let trace2 = {
            x: otu_ids_b,
            y: sample_values_b,
            mode: 'markers',
            marker: {
                size: sample_values_b,
                color: otu_ids_b,
                colorscale: 'Earth'
            },
            text: otu_labels_b
        };

        //Define data
        let plotData2 = [trace2];

        let layout2 = {
            // showlegend: false,
            height: 500,
            width: 1100,
            xaxis: { title: 'OTU ID' },
            //hovermode: "closests",
            margin: {
                t: 0,
                l: 0,
                r: 0
            }
        };

        // Responsiveness
        let config = { responsive: true }

        // Display chart
        Plotly.newPlot('bubble', plotData2, layout2, config);
    })
}

// Display metadata in the panel according to id value
function metadataTable(Sampleid) {

    d3.json("../../data.json").then(function (data) {
        //console.log(data.metadata);
        let options = d3.select("#sample-metadata");
        // Filter data
        let filteredMetadata = data.metadata.filter(el => el.id === parseInt(Sampleid))
        //Remove any children
        options.html("")
        //console.log(filteredMetadata);

        //Insert each key, value according to id 
        filteredMetadata.forEach(el => {
            Object.entries(el).forEach(([key, value]) => {
                //console.log(key, value)
                options.append("h6").text(`${key}:${value}`);
            })
        });

    })
}


// Append each id to the dropdown menu
d3.json("../../data.json").then(function (data) {
    let dropdown = d3.select("#selDataset")
    data.names.forEach((el) => {
        dropdown.append("option").text(el)
    });
});

// Function to display gauge chart
function gaugeChart(Sampleid) {

    d3.json("../../data.json").then(function (data) {
        // Filter data according to id
        let wfreq = data.metadata.filter(el => el.id === parseInt(Sampleid))[0].wfreq
        //console.log(wfreq);

        // Define trace
        let trace3 = {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per week</span>" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9]
                },
                steps: [
                    { range: [0, 1], color: "#ddd8c4" },
                    { range: [1, 2], color: "#a3c9a8" },
                    { range: [2, 3], color: "#84b59f" },
                    { range: [3, 4], color: "#69a297" },
                    { range: [4, 5], color: "#668f80" },
                    { range: [5, 6], color: "#768948" },
                    { range: [6, 7], color: "#607744" },
                    { range: [7, 8], color: "#34623f" },
                    { range: [8, 9], color: "#1e2f23" }
                ],
                bar: { color: "black" }
            }
        }

        // Define data
        let plotData3 = [trace3];

        //Define layout
        let layout3 = {
            height: 500,
            width: 450,
            margin: { t: 0, b: 0, r: 100, l: 50 }
        };

        //Responsiveness
        let config = { responsive: true }

        // Display chart
        Plotly.newPlot('gauge', plotData3, layout3, config);
    })
}

// Function to display initial charts and metadata of the first id
function init() {
    d3.json("../../data.json").then(function (data) {

        let initID = data.metadata[0].id
        barChart(initID)
        bubbleChart(initID)
        metadataTable(initID)
        gaugeChart(initID)
    })
};

// Function update the information from the dashboard according to id
function optionChanged(newID) {
    barChart(newID)
    bubbleChart(newID)
    metadataTable(newID)
    gaugeChart(newID)
}

// Initialize dashboard
init();