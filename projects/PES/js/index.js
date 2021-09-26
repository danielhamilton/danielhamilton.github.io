const adoption = 87
const growth = 84.8
const growthRate = 25.6
const stickiness = 64.3
const pes = 76

Highcharts.chart('container', {
	chart: {
		polar: true,
		spacing: [40, 0, -70, 30],
		styledMode: true

	},
	credits: false,
	exporting: {
		enabled: false
	},
	legend: {
		enabled: false
	},
	plotOptions: {
		series: {
			enableMouseTracking: false,
			states: {
				hover: {
					enabled: false
				}
			}
		},
		area: {
			marker: false
		},
		line: {
			marker: false
		}
	},
	series: [
		// Hack to create a dead space in the center of the spider web chart.
		{
			animation: false,
			data: [50, 50, 50],
			pointPlacement: 'on',
			type: 'area',
			className: 'pes-title-area'
		},
		{
			// We have to offset all the scores by 50 so they aren't behind the dead space.
			data: [
				adoption + 50,
				stickiness + 50,
				growth + 50
			],
			className: 'pes-line',
			pointPlacement: 'on',
			type: 'line'
		}
	],
	// Hack to get a label in the center of the chart.
	title: {
		floating: true,
		text: `<div class="pes-title"><span class="value">${pes}</span><br/>PES</div>`,
		useHTML: true,
		verticalAlign: 'middle'
	},
	tooltip: {
		enabled: false
	},
	xAxis: {
		categories: ['Adoption', 'Stickiness', 'Growth'],
		labels: {
			formatter() {
				if (typeof this.value !== 'string') return this.axis.defaultLabelFormatter.call(this);

				let metric = ''
				if (this.value.toLowerCase() === 'growth') {
					metric = `${growth}<span class="details">(${growthRate}%)</span>`
				} else if (this.value.toLowerCase() === 'adoption') {
					metric = `${adoption}%`
				} else {
					metric = `${stickiness}%`
				}

				return `<div class="pes-label ${this.value.toLowerCase()}-label"><span class="value">${metric}</span><br />${this.value}</div>`
			},
			useHTML: true
		},
		tickmarkPlacement: 'on'
	},
	yAxis: {
		gridLineInterpolation: 'polygon',
		labels: {
			enabled: false
		},
		min: 0,
		max: 150
	}
})
