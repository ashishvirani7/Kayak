var d3 = require("d3");


d3.csv("data/cities.csv")
.row(function(d) { return {key: d.key, value: +d.value}; })
.get(function(error, rows) { console.log(rows); });