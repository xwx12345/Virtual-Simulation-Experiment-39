<template>
	<a-button @click="simulate()">开始模拟</a-button>
		<div id="chart" style="width: 800px; height: 600px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		//从外部表格传参来的四个值
		props: ['x1', 'x2', 'y1', 'y2'],
		data() {
			return {
				simulationResults: [],
			}
		},
		methods: {
			simulate() {
				const iterations = 1000; // 模拟迭代次数

				// 清空之前的模拟结果
				this.simulationResults = [];

				// 进行模拟并记录结果
				for (let i = 0; i < iterations; i++) {
					const result = this.simulateOneIteration(); // 模拟单次迭代的结果
					// console.log(result)
					this.simulationResults.push(result);
				}

				// 绘制概率分布图
				this.drawChart();
			},
			simulateOneIteration() {
				// 模拟项目天数（正态分布）
				var p1 = parseFloat(this.x1)
				var p2 = parseFloat(this.x2)
				var c1 = parseFloat(this.y1)
				var c2 = parseFloat(this.y2)
				//这里参数1为30 参数2为5
				const projectDays = this.randomNormalDistribution(p1, p2);
				// const projectDays = this.randomNormalDistribution(30, 5);
				// 模拟平均成本（均匀分布）
				//这里参数1为50 参数2 为100
				const averageCost = this.randomUniformDistribution(c1, c2);

				return projectDays * averageCost; // 返回项目成本
			},
			randomNormalDistribution(mean, stdDev) {
				// 生成正态分布随机数
				const u = 1 - Math.random();
				const v = 1 - Math.random();
				const randomNum = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

				return mean + stdDev * randomNum;
			},
			randomUniformDistribution(min, max) {
				// 生成均匀分布随机数
				return Math.random() * (max - min) + min;
			},
			drawChart() {
				const data = this.calculateProbabilityDistribution();

				const option = {
					title: {
						text: '项目成本概率分布',
					},
					xAxis: {
						type: 'category',
						data: Object.keys(data),
						name: '项目成本',
					},
					yAxis: {
						type: 'value',
						name: '概率',
					},
					series: [{
						data: Object.values(data),
						type: 'bar',
					}, ],
				};

				this.chart.setOption(option);
			},
			calculateProbabilityDistribution() {
				const data = {};
				const binSize = 10; // 直方图的柱宽

				// 统计每个区间的计数
				for (let i = 0; i < this.simulationResults.length; i++) {
					const cost = this.simulationResults[i];
					const bin = Math.floor(cost / binSize) * binSize;
					data[bin] = (data[bin] || 0) + 1;
				}

				// 计算概率密度
				const totalCount = this.simulationResults.length;
				for (const key in data) {
					data[key] = data[key] / totalCount;
				}

				return data;
			},
		},
		mounted() {
			this.chart = echarts.init(document.getElementById('chart'));
		}
	}
</script>

<style>
</style>