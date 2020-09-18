import React from 'react'
import {Line} from 'react-chartjs-2';
import './Chart.css'

function Chart(props) {
    const state = {
        labels: props.dates,
        datasets: [
          {
            label: 'Order Count',
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: props.orderCount
          }
        ]
      }

    return (
        <div className="Chart">
            {
            (props.dates.length) ? 
            <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Daily Order Trend',
                fontSize:20
              }
            }}
          /> : null
            }
        </div>
    )
}

export default Chart
