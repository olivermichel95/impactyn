var chartOne = $(".chart.chart-1");
var chartTwo = $(".chart.chart-2");
var chartThree = $(".chart.chart-3");
var chartFour = $(".chart.chart-4");
var chartFive = $(".chart.chart-5");

$(document).ready(function() {
    // chart 1 (pie chart)
    if (chartOne.length > 0) {
        if (chartOne.length == 1) {
            initChartOne(chartOne, $(".chart.chart-1 .pie-chart").get(0).getContext('2d'));
        } else {
            chartOne.each(function() {
                initChartOne($(this), $(this).find(".pie-chart").get(0).getContext('2d'));
            });
        }
    }

    // chart 2(horizontal graph chart)
    if (chartTwo.length > 0) {
        if (chartTwo.length == 1) {
            initChartTwo(chartTwo, $(".chart.chart-2 .horizontal-graph-chart").get(0).getContext('2d'));
        } else {
            chartTwo.each(function() {
                initChartTwo($(this), $(this).find(".horizontal-graph-chart").get(0).getContext('2d'));
            });
        }
    }

    // chart 3(doughnut chart)
    if (chartThree.length > 0) {
        if (chartThree.length == 1) {
            initChartThree(chartThree, $(".chart.chart-3 .doughnut-chart").get(0).getContext('2d'));
        } else {
            chartThree.each(function() {
                initChartThree($(this), $(this).find(".doughnut-chart").get(0).getContext('2d'));
            });
        }
    }

    // chart 4(bar chart)
    if (chartFour.length > 0) {
        if (chartFour.length == 1) {
            initChartFour(chartFour, $(".chart.chart-4 .bar-chart").get(0).getContext('2d'));
        } else {
            chartFour.each(function() {
                initChartFour($(this), $(this).find(".bar-chart").get(0).getContext('2d'));
            });
        }
    }

    // chart 5(line chart)
    if (chartFive.length > 0) {
        if (chartFive.length == 1) {
            initChartFive(chartFive, $(".chart.chart-5 .line-chart").get(0).getContext('2d'));
        } else {
            chartFive.each(function() {
                initChartFive($(this), $(this).find(".line-chart").get(0).getContext('2d'));
            });
        }
    }
});

//get data from graph
function getGraphData(selector) {
    var returnObject = {
        labels: [],
        numbers: [],
        colors: []
    }
    var data = selector.data("data");
    console.log(selector);
    console.log(data);
    var labels = Object.keys(data);
    var values = Object.values(data);
    var numbers = [];
    var colors = [];
    values.forEach(function(value) {
        numbers.push(value["number"]);
        colors.push(value["color"]);
    });

    returnObject.labels = labels;
    returnObject.numbers = numbers;
    returnObject.colors = colors;

    return returnObject;
}

//get chart 4 data
function getChartFourData(chartFour) {
    var data = chartFour.data("data");
    var datasetsObj = Object.values(data);
    var returnedData = {
        ages: [],
        datasets: []
    }

    var ages = []
    var datasets = []
    datasetsObj.forEach(function(datasetObj, index) {
        var dataset = {
            label: null,
            data: [],
            backgroundColor: null,
            stack: null,
            borderRadius: 4
        }
        dataset.label = datasetObj.label;
        dataset.backgroundColor = datasetObj.color;
        dataset.stack = `Stack ${index}`;

        datasetObj.data.forEach(function(dataValue) {
            if (index == 0) {
                ages.push(dataValue.age);
            }
            dataset.data.push(dataValue.number);
        });

        datasets.push(dataset);
    });

    returnedData.ages = ages;
    returnedData.datasets = datasets;

    return returnedData;
}

//draw chart one data
function drawChartOneData(chartOneElement, chartOneData) {
    var labels = chartOneData.labels;
    var numbers = chartOneData.numbers;
    var colors = chartOneData.colors;
    var infosContainer = chartOneElement.find(".chart-info-container");
    for (var i = 0; i < labels.length; ++i) {
        let infoContainer = $("<div>", { class: "info" });
        let color = $("<div>", { class: "color" });
        let label = ($("<p>", { class: "title mb-0", text: labels[i] }));
        let percentage = ($("<p>", { class: "percentage mb-0", text: `${numbers[i]}%` }));
        color.css("background-color", colors[i]);
        infoContainer.appendTo(infosContainer);
        color.appendTo(infoContainer);
        label.appendTo(infoContainer);
        percentage.appendTo(infoContainer);
    }
}

//draw chart three data
function drawChartThreeData(chartThreeData) {
    var labels = chartThreeData.labels;
    var numbers = chartThreeData.numbers;
    var colors = chartThreeData.colors;
    var infosContainer = chartThree.find(".chart-info");

    for (var i = 0; i < labels.length; ++i) {
        let infoContainer = $("<div>", { class: "info" });
        let color = $("<div>", { class: "color" });
        let label = ($("<p>", { class: "label mb-0", text: labels[i] }));
        let percentage = ($("<p>", { class: "number mb-0", text: numbers[i] }));
        let currency = ($("<p>", { class: "currency mb-0", text: "EGP" }));
        color.css("background-color", colors[i]);
        percentage.css("color", colors[i]);
        infoContainer.appendTo(infosContainer);
        color.appendTo(infoContainer);
        label.appendTo(infoContainer);
        percentage.appendTo(infoContainer);
        currency.appendTo(infoContainer);
    }
}

//draw chart four data
function drawChartFourData(chartFourData) {
    var infosContainer = chartFour.find(".graph-infos");
    chartFourData.forEach(function(data) {
        let infoContainer = $("<div>", { class: "graph-info" });
        let color = $("<div>", { class: "color" });
        let label = ($("<p>", { class: "label mb-0", text: data.label }));
        color.css("background-color", data.backgroundColor);
        color.appendTo(infoContainer);
        label.appendTo(infoContainer);
        infoContainer.appendTo(infosContainer);
    });
}

// function initChart(chartElement) {
//     if (chartElement.length > 0) {
//         if (chartElement.length == 1) {
//             initChartOne(chartElement, $(".chart.chart-1 canvas").get(0).getContext('2d'));
//         } else {
//             chartElement.each(function() {
//                 initChartOne($(this), $(this).find("canvas").get(0).getContext('2d'));
//             });
//         }
//     }
// }

//init chart 1
function initChartOne(chartOneElement, chartOneHTMLElement) {
    var chartOneData = getGraphData(chartOneElement);
    var chartOneOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                display: false
            }
        }
    }
    if ($(window).width() < 991.98) {
        chartOneOptions.aspectRatio = 1;
    }
    const pieChart = new Chart(chartOneHTMLElement, {
        type: 'pie',
        options: chartOneOptions,
        data: {
            labels: chartOneData.labels,
            datasets: [{
                data: chartOneData.numbers,
                backgroundColor: chartOneData.colors,
            }]
        },
    });
    drawChartOneData(chartOneElement, chartOneData);
}

//init chart 2
function initChartTwo(chartTwoElement, chartTwoHTMLElement) {
    var chartTwoData = getGraphData(chartTwoElement);
    const barChart = new Chart(chartTwoHTMLElement, {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3,
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
        data: {
            labels: chartTwoData.labels,
            datasets: [{
                data: chartTwoData.numbers,
                backgroundColor: chartTwoData.colors,
                borderRadius: 10,
                barPercentage: 0.4,
            }]
        },
    });
}

//init chart 3
function initChartThree(chartThreeElement, chartThreeHTMLElement) {
    var chartThreeData = getGraphData(chartThreeElement);
    const doughnatChart = new Chart(chartThreeHTMLElement, {
        type: 'doughnut',
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    display: false
                }
            }
        },
        data: {
            labels: chartThreeData.labels,
            datasets: [{
                data: chartThreeData.numbers,
                backgroundColor: chartThreeData.colors,
            }]
        },
    });
    drawChartThreeData(chartThreeData);
}

//init chart 4
function initChartFour(chartFourElement, chartFourHTMLElement) {
    var chartFourData = getChartFourData(chartFourElement);
    const doughnatChart = new Chart(chartFourHTMLElement, {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        },
        data: {
            labels: chartFourData.ages,
            datasets: chartFourData.datasets
        },
    });
    drawChartFourData(chartFourData.datasets);
}

//init chart 5
function initChartFive(chartFiveElement, chartFiveHTMLElement) {
    var chartFiveData = getGraphData(chartFiveElement);
    const lineChart = new Chart(chartFiveHTMLElement, {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3,
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    display: true,
                }
            }
        },
        data: {
            labels: chartFiveData.labels,
            datasets: [{
                data: chartFiveData.numbers,
                backgroundColor: chartFiveData.colors,
                borderColor: "#00ABE0",
                lineTension: 0.5
            }]
        },
    });
}