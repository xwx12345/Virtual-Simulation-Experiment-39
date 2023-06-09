<template>
	<a-button @click="simulate()">开始模拟</a-button>
	请输入图表展示区间宽度：<a-input-number id="inputNumber" v-model:value="bin_size" :min="1" />
	<div id="chart" style="width: 800px; height: 600px"></div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		//从外部表格传参来的四个值
		props: ['chart_type', 'x1', 'x2', 'y1', 'y2', 'z1', 'z2'],
		data() {
			return {
				simulationResults: [],
				average: 0,
				median: 0,
				q1: 0,
				q3: 0,
				bin_size: 10,
				show: true,
			}
		},
		methods: {
			simulate() {
				const iterations = 1000; // 模拟迭代次数

				// 清空之前的模拟结果
				this.simulationResults = [];
				console.log('type', this.chart_type)
				console.log('x1', this.x1)
				console.log('x2', this.x2)
				console.log('y1', this.y1)
				console.log('y2', this.y2)
				console.log('z1', this.z1)
				console.log('z2', this.z2)
				var result = 0
				this.show = true
				// 进行模拟并记录结果
				for (let i = 0; i < iterations; i++) {
					if (this.chart_type == 1) {
						result = this.simulateOneIteration_first(); // 模拟单次迭代的结果
					} else if (this.chart_type == 2) {
						result = this.simulateOneIteration_second();
					} else if (this.chart_type == 3) {
						result = this.simulateOneIteration_third();
					} else {
						result = this.simulateOneIteration_fourth();
					}
					this.simulationResults.push(result);
				}

				// 绘制概率分布图
				this.drawChart();
			},
			simulateOneIteration_first() {
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
				// const averageCost = this.randomUniformDistribution(50, 100);

				return projectDays * averageCost; // 返回项目成本
			},
			simulateOneIteration_second() {
				var p1 = parseFloat(this.x1)
				var p2 = parseFloat(this.x2)
				var l = parseFloat(this.y1)
				// var l = parseFloat(this.y2)
				var c1 = parseFloat(this.z1)
				var c2 = parseFloat(this.z2)

				const mem_num = this.randomUniformDistribution(p1, p2); //开发人员数量
				const mem_level = this.randomPoisson(l); //开发人员水平
				const complexity = this.randomNormalDistribution(c1, c2); //系统复杂度

				return mem_num * mem_level * complexity; //项目的构建质量
			},
			simulateOneIteration_third() {
				var s1 = parseFloat(this.x1)
				var s2 = parseFloat(this.x2)
				var s3 = parseFloat(this.y1)
				var s4 = parseFloat(this.y2)
				var p1 = parseFloat(this.z1)
				var p2 = parseFloat(this.z2)

				const market_scale = this.randomNormalDistribution(s1, s2); //市场规模
				const market_share = this.randomNormalDistribution(s3, s4); //市场份额
				const market_price = this.randomNormalDistribution(p1, p2); //产品价格

				return market_scale * market_share * market_price; //项目的销售量
			},
			simulateOneIteration_fourth() {
				var d1 = parseFloat(this.x1)
				var d2 = parseFloat(this.x2)
				var c1 = parseFloat(this.y1)
				var c2 = parseFloat(this.y2)
				var f1 = parseFloat(this.z1)
				var f2 = parseFloat(this.z2)

				const develop_time = this.randomNormalDistribution(d1, d2); //开发时间
				const code_fault = this.randomNormalDistribution(c1, c2); //代码缺陷率
				const fix_time = this.randomNormalDistribution(f1, f2); //缺陷修复时间

				return develop_time * code_fault * fix_time; //项目的开发时间
			},
			randomNormalDistribution(mean, stdDev) {
				// 生成正态分布随机数
				const u = 1 - Math.random();
				const v = 1 - Math.random();
				const randomNum = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

				return mean + stdDev * randomNum;
			},
			randomUniformDistribution(min, max) {
				if (max < min && this.show) {
					alert('均匀分布的下界应小于上界')
					this.show = false
				}
				// 生成均匀分布随机数
				return Math.random() * (max - min) + min;
			},
			randomPoisson(lambda) {
				// 生成泊松分布随机数
				const L = Math.exp(-lambda);
				let k = 0;
				let p = 1;

				do {
					k++;
					p *= Math.random();
				} while (p > L);

				return k - 1;
			},
			drawChart() {
				const data = this.calculateProbabilityDistribution();
				this.calculateQuartilesAndMedian()
				const titles = ['项目成本的概率分布', '项目的构建质量的概率分布', '项目的销售量的概率分布', '项目开发时间的概率分布']
				const xnames = ['项目成本', '项目的构建质量', '项目的销售量', '项目开发时间']
				const option = {
					title: {
						text: titles[this.chart_type - 1],
						left: 'center',
						textStyle: { // 主标题样式
							fontSize: 24,
							color: "#000000"
						},
						subtext: '平均值：' + this.calculateAverage().toFixed(2) + ' 中位数：' + this.median + ' 第一四分位数：' +
							this.q1 + ' 第二四分位数：' + this.q3,
					},
					xAxis: {
						type: 'category',
						data: Object.keys(data),
						name: xnames[this.chart_type - 1],
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
			calculateAverage() {
				var total = 0
				for (let i = 0; i < this.simulationResults.length; i++) {
					const cost = this.simulationResults[i];
					total = total + cost
				}
				//计算平均值
				return total / 1000
			},
			calculateQuartilesAndMedian() {
				// 对数组进行排序
				const sortedArr = this.simulationResults.slice().sort((a, b) => a - b);

				// 计算中位数
				this.median = this.calculateMedian(sortedArr).toFixed(2);

				// 计算第一四分位数
				this.q1 = this.calculatePercentile(sortedArr, 25).toFixed(2);

				// 计算第三四分位数
				this.q3 = this.calculatePercentile(sortedArr, 75).toFixed(2);
			},
			calculateMedian(sortedArr) {
				const length = sortedArr.length;

				if (length % 2 === 0) {
					const midIndex1 = length / 2 - 1;
					const midIndex2 = length / 2;
					return (sortedArr[midIndex1] + sortedArr[midIndex2]) / 2;
				} else {
					const midIndex = Math.floor(length / 2);
					return sortedArr[midIndex];
				}
			},
			calculatePercentile(sortedArr, percentile) {
				const length = sortedArr.length;
				const index = percentile / 100 * (length - 1);

				if (Number.isInteger(index)) {
					return sortedArr[index];
				} else {
					const lowerIndex = Math.floor(index);
					const upperIndex = Math.ceil(index);
					const lowerValue = sortedArr[lowerIndex];
					const upperValue = sortedArr[upperIndex];
					return lowerValue + (upperValue - lowerValue) * (index - lowerIndex);
				}
			},
			calculateProbabilityDistribution() {
				const data = {};
				const binSize = this.bin_size; // 直方图的柱宽

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