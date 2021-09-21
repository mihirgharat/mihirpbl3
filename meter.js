// Enter a speed between 0 and 180
const url="https://airocity-server.herokuapp.com/get_aqi?code=Mum-14-4-10";
                async function getdata(url){
                    const res=await fetch(url);
                    const datam=await res.json(); 
                   console.log(datam.result.AQI);
                var level=datam.result.AQI
                console.log(level);
                plott(level);
                }
                getdata(url);
function plott(level){
// Trig to calc meter point
var degrees = 180 - level,
	 radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
	 pathX = String(x),
	 space = ' ',
	 pathY = String(y),
	 pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
	marker: {size: 28, color:'850000'},
	showlegend: false,
	name: 'speed',
	text: level,
	hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['very poor', 'poor', 'bad', 'Average',
			'satisfactory', 'good', 'excellent'],
  textinfo: 'text',
  textposition:'inside',	  
  marker: {colors:['marron','red','purple','orange','yellow','green','lime']},
  labels: ['450-500','321-450','230-320','161-230','81-160','41-80','0-40'],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Gauge</b> <br> Visualization MUMBAI',
  height: 1000,
  width: 1000,
  xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true});
}