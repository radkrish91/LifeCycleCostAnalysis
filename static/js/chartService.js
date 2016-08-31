//Javascript to load google chart

google.load('visualization', '1', {packages:['corechart']});

google.setOnLoadCallback(drawChart);

function drawChart(columnChartValues, pieChartValues, pieChartValues2) {
	
	var optionsColumn = {
							title: "Life Cycle Cost Comparison Of Conventional and New material", 
							width: '100%',
							height: '100%',
							titleTextStyle:{fontSize: 18},
							legend: { position: 'in' , maxlines: 2},
							hAxis:{ title : 'Years'},
							vAxis:{ title : 'NPV (in million $)'},
							bar: { groupWidth: '65%' },
							colors: ['#bcbddc', '#756bb1', '#fee0d2', '#fc9272'],
							isStacked: false,
						  };
						  
	var dataColumn = google.visualization.arrayToDataTable(JSON.parse(JSON.stringify(columnChartValues)));
	
	var dataPie = google.visualization.arrayToDataTable(JSON.parse(JSON.stringify(pieChartValues)));
	var dataPie2 = google.visualization.arrayToDataTable(JSON.parse(JSON.stringify(pieChartValues2)));
	
	var optionsPie = {
	  title: "Life Cycle Cost of Conventional Materials", 
	  titleTextStyle:{fontSize: 18},
	  is3D: true,
	  width: '100%',
	  height: '100%'
	};
	
	var optionsPie2 = {
	  title: "Life Cycle Cost of New Materials", 
	  titleTextStyle:{fontSize: 18},
	  is3D: true,
	  width: '100%',
	  height: '100%'
	};
	
	document.getElementById("graphSlider").style.display="block";	
	document.getElementById("outputButtons").style.display="block";	
	
	var ColChartContainer = document.getElementById('chart_div');
	var PieChartContainer = document.getElementById('piechart');
	var PieChartContainer2 = document.getElementById('piechart2');
	
	//document.getElementById("graphSlider").style.display="inline-block";	
	ColChartContainer.style.display = 'block';
	PieChartContainer.style.display = 'block';
	PieChartContainer2.style.display = 'block';
	
	var chartCol = new google.visualization.ColumnChart(ColChartContainer);
	var chartPie = new google.visualization.PieChart(PieChartContainer);
	var chartPie2 = new google.visualization.PieChart(PieChartContainer2);
	
	google.visualization.events.addListener(chartCol, 'ready', function () {
		ColChartContainer.style.display = 'none';
	});
	
	google.visualization.events.addListener(chartPie, 'ready', function () {
		PieChartContainer.style.display = 'none';
	});
	
	google.visualization.events.addListener(chartPie2, 'ready', function () {
		PieChartContainer2.style.display = 'none';
	});
	
	
    chartCol.draw(dataColumn, optionsColumn);
	chartPie.draw(dataPie, optionsPie);
	chartPie2.draw(dataPie2, optionsPie2);
	
	ColChartContainer.style.display = 'block';
	PieChartContainer.style.display = 'block';
	PieChartContainer2.style.display = 'block';
	}