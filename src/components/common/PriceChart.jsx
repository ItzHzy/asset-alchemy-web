import React from 'react'
import { LineChart, XAxis, YAxis, Line } from 'recharts'

function PriceChart(props) {
    return (
        <LineChart height={props.height} width={props.width} data={props.data}>
            <XAxis dataKey="date" />
            <YAxis mirror={true} domain={['auto', 'auto']} />
            <Line
                type="monotone"
                dataKey="close"
                stroke="#ff9933"
                dot={false}
            />
        </LineChart>
    )
}

export default PriceChart
