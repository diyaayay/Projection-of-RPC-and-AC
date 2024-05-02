import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function LineChart({ data }) {
    if (!data || data.length === 0) {
      return <div>No data available</div>;
    }
  
    const datasets = [];
  
    data.forEach((entry) => {
      const occurrencesData = {
        label: `Schedules Involved ${entry.schedules_involved.join(', ')}`,
        data: [],
        fill: false,
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
      };
  
      entry.occurrences.forEach((occurrence) => {
        occurrence.forEach((occurrenceStr) => {
          console.log(occurrenceStr);
          const values=occurrenceStr.split(' ');
          console.log(values);
          const dateTimeStr= values[0]+" "+values[1];
          const schedule= values[2];
          
    
          
  
          occurrencesData.data.push({
            x: dateTimeStr,
            y: parseInt(schedule),
          });
        });
      });
  
      datasets.push(occurrencesData);
    });
  
    const chartData = {
      datasets: datasets,
    };
  
    const options = {
      showLine:false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM DD YYYY HH:mm',
            },
            tooltipFormat: 'MMM DD YYYY HH:mm',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date and Time',
          },
        }],
        yAxes: [{
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: 'Schedule Involved',
          },
        }],
      },
    };
  
    return (
      <div className="dataCard revenueCard">
        <div className="dataCard customerCard">
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  }