<template>
	<div class="subtitle">
		一、实验目的
	</div>
	<div class="content">
		<div v-if="obshow">
			<span>{{objective}}</span>
			<a-button type="primary" ghost @click="editob()" style="margin-left: 10px;">编辑</a-button>
		</div>
		<div v-else>
			<a-textarea v-model:value="objective" placeholder="textarea with clear icon" allow-clear />
			<a-button type="primary" ghost @click="saveob()" style="margin-top: 5px;">保存</a-button>
		</div>
	</div>
	<div class="subtitle">
		二、实验内容
	</div>
	<div class="content">
		<div v-if="contshow">
			<span>{{content}}</span>
			<a-button type="primary" ghost @click="editcont()" style="margin-left: 10px;">编辑</a-button>
		</div>
		<div v-else>
			<a-textarea v-model:value="content" placeholder="textarea with clear icon" allow-clear />
			<a-button type="primary" ghost @click="savecont()" style="margin-top: 5px;">保存</a-button>
		</div>
	</div>
	<div class="subtitle">
		三、实验原理
	</div>
	<div class="content">
		蒙特卡洛方法是基于概率论和统计学的随机模拟方法，它可以用来求解各种复杂的数学问题，包括数值积分、概率分布、随机过程、优化问题等。<br />
		其基本思想是通过重复随机抽样和计算来估计未知参数或解决问题。
	</div>
	<div class="subtitle">
		四、实验步骤
	</div>
	<div class="content">
		<b>1.定义问题和变量：</b><br />
		确定需要进行求解或分析的问题和变量，并对其进行数学建模<br />
		<b>2.设定变量的概率分布：</b><br />
		对于每个变量，选择适当的概率分布来估计其概率分布函数，并确定其参数。这可以基于历史数据、专家意见、行业数据等进行确定。<br />
		<b>3.进行随机模拟：</b><br />
		使用概率分布来生成随机数，模拟每个变量的可能取值。重复这个过程，可以得到大量的可能情况。<br />
		<b>4.计算结果：</b><br />
		对于每个随机生成的情况，使用相关的计算公式，计算得到结果。<br />
		<b>5.分析结果：</b><br />
		收集所有情况下的结果，进行统计分析，并统计它们的概率分布。可以使用图表等工具来帮助分析结果，例如直方图、散点图等。<br />
	</div>
	<div class="subtitle">
		五、实验结果
	</div>
	<div>
		<a-divider orientation="left">选择实验实例</a-divider>
		<a-radio-group v-model:value="exp">
			<a-radio :style="radioStyle" :value="1">项目总成本</a-radio>
			<a-radio :style="radioStyle" :value="2">软件构建质量</a-radio>
			<a-radio :style="radioStyle" :value="3">软件销售量</a-radio>
			<a-radio :style="radioStyle" :value="4">软件缺陷修复</a-radio>
		</a-radio-group>
		<a-divider orientation="left">确定变量概率分布</a-divider>
		<div style="font-size: 18px; padding:5px">{{formula}}</div>
		<div class="subs">
			<span>正态分布：f(x) = (1 / σ√(2π)) * e^(-(x-μ)² / (2σ²))</span>
			<span>参数1：μ（mu）是正态分布的均值（期望值），表示分布的中心位置。</span>
			<span>参数2：σ（sigma）是正态分布的标准差，用来衡量数据的离散程度。</span>
		</div>
		<div class="subs">
			<span>均匀分布：f(x) = 1 / (b - a)，当 a ≤ x ≤ b</span>
			<span>参数1：a 是区间的下界。</span>
			<span>参数2：b 是区间的上界。</span>
		</div>
		<div class="subs">
			<span>泊松分布：P(X = k) = (λ^k * e^(-λ)) / k!</span>
			<span>P(X = k) 是随机变量 X 取值为 k 的概率</span>
			<span>λ 是平均发生率（每个时间或空间间隔内的平均事件发生次数）</span>
		</div>
		<a-table :columns="columns" :data-source="tableData" bordered>
			<template #bodyCell="{ column, text, record }">
				<template v-if="['x1','x2'].includes(column.dataIndex)">
					<div>
						<a-input-number v-if="editableData[record.key]" :step="0.01" string-mode
							v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
						<template v-else>
							{{ text }}
						</template>
					</div>
				</template>
				<template v-else-if="column.dataIndex === 'operation'">
					<div class="editable-row-operations">
						<span v-if="editableData[record.key]">
							<a-typography-link @click="save(record.key)">Save</a-typography-link>
						</span>
						<span v-else>
							<a @click="edit(record.key)">Edit</a>
						</span>
					</div>
				</template>
			</template>
		</a-table>
		<a-divider orientation="left">概率分布统计</a-divider>
		<div>
			<dataChart :chart_type="exp" :x1="value1" :x2="value2" :y1="value3" :y2="value4" :z1="value5" :z2="value6">
			</dataChart>
		</div>
	</div>
	<div class="subtitle">
		六、实验思考
	</div>
	<div class="content">
		<div v-if="thinkshow">
			<span>{{think}}</span>
			<a-button type="primary" ghost @click="editthink()" style="margin-left: 10px;">编辑</a-button>
		</div>
		<div v-else>
			<a-textarea v-model:value="think" placeholder="textarea with clear icon" allow-clear />
			<a-button type="primary" ghost @click="savethink()" style="margin-top: 5px;">保存</a-button>
		</div>
	</div>
	<div class="bottom">
		<a-button type="primary" ghost @click="generatePDF()" style="margin-top: 5px;">生成实验报告</a-button>
	</div>
</template>

<script>
	import {
		cloneDeep
	} from 'lodash-es';
	import dataChart from './test.vue'
	export default {
		components: {
			dataChart
		},
		data() {
			return {
				fileList: [],
				imageUrl: null,
				varnum: 2,
				obshow: true,
				objective: '通过蒙特卡洛方法，对一个软件开发项目进行风险分析，以预测项目的成本、进度和成功概率等方面的风险。',
				contshow: true,
				content: '在本次实验中，我们使用蒙特卡洛方法对软件开发项目进行风险分析，包括估计项目的成本、进度和成功概率等方面的风险。为模拟项目，我们选择了三个关键变量：开发时间、测试时间和项目成本。对于每个变量，我们使用某种分布来估计它的概率分布，并利用平台进行随机模拟和计算结果。',
				thinkshow: true,
				think: '请输入实验思考',
				exp: 1,
				editableData: [],
				dataSource1: [{
						key: '1',
						name: '项目天数',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '2',
						name: '平均花费',
						distribution: '均匀分布',
						x1: 0,
						x2: 0,
					},
				],
				dataSource2: [{
						key: '1',
						name: '开发人员数量',
						distribution: '均匀分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '2',
						name: '开发人员水平',
						distribution: '泊松分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '3',
						name: '系统复杂度',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
				],
				dataSource3: [{
						key: '1',
						name: '市场规模',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '2',
						name: '市场份额',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '3',
						name: '产品价格',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
				],
				dataSource4: [{
						key: '1',
						name: '开发时间',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '2',
						name: '代码缺陷率',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
					{
						key: '3',
						name: '缺陷修复时间',
						distribution: '正态分布',
						x1: 0,
						x2: 0,
					},
				],
				columns: [{
						title: '序号',
						dataIndex: 'key',
						width: 100,
					},
					{
						title: '变量名称',
						dataIndex: 'name',
						width: 150,
					},
					{
						title: '概率分布类型',
						dataIndex: 'distribution',
						width: 150,
					},
					{
						title: '数值',
						dataIndex: 'quantity',
						children: [{
								title: '参数1',
								dataIndex: 'x1',
								key: 'x1',
							},
							{
								title: '参数2',
								dataIndex: 'x2',
								key: 'x2',
							},
						]
					},
					{
						title: 'operation',
						dataIndex: 'operation',
						width: 150,
					},
				],
			}
		},
		computed: {
			value1() {
				switch (this.exp) {
					case 1:
						return this.dataSource1[0].x1;
					case 2:
						return this.dataSource2[0].x1;
					case 3:
						return this.dataSource3[0].x1;
					case 4:
						return this.dataSource4[0].x1;
					default:
						return 0;
				}
			},
			value2() {
				switch (this.exp) {
					case 1:
						return this.dataSource1[0].x2
					case 2:
						return this.dataSource2[0].x2;
					case 3:
						return this.dataSource3[0].x2;
					case 4:
						return this.dataSource4[0].x2;
					default:
						return 0;
				}
			},
			value3() {
				switch (this.exp) {
					case 1:
						return this.dataSource1[1].x1;
					case 2:
						return this.dataSource2[1].x1;
					case 3:
						return this.dataSource3[1].x1;
					case 4:
						return this.dataSource4[1].x1;
					default:
						return 0;
				}
			},
			value4() {
				switch (this.exp) {
					case 1:
						return this.dataSource1[1].x2;
					case 2:
						return this.dataSource2[1].x2;
					case 3:
						return this.dataSource3[1].x2;
					case 4:
						return this.dataSource4[1].x2;
					default:
						return 0;
				}
			},
			value5() {
				switch (this.exp) {
					case 1:
						return 0;
					case 2:
						return this.dataSource2[2].x1;
					case 3:
						return this.dataSource3[2].x1;
					case 4:
						return this.dataSource4[2].x1;
					default:
						return 0;
				}
			},
			value6() {
				switch (this.exp) {
					case 1:
						return 0;
					case 2:
						return this.dataSource2[2].x2;
					case 3:
						return this.dataSource3[2].x2;
					case 4:
						return this.dataSource4[2].x2;
					default:
						return 0;
				}
			},
			formula() {
				switch (this.exp) {
					case 1:
						return '项目成本=项目天数*平均花费';
					case 2:
						return '软件构建质量（每千行代码bug数）=开发人员数量*开发人员水平（每千行代码bug数）*系统复杂度（有几千行）';
					case 3:
						return '销售量=市场规模*市场份额*产品价格';
					default:
						return '缺陷修复时间=平均修复时间*开发时间*代码缺陷率';
				}
			},
			tableData() {
				switch (this.exp) {
					case 1:
						return this.dataSource1;
					case 2:
						return this.dataSource2;
					case 3:
						return this.dataSource3;
					default:
						return this.dataSource4;
				}
			},
		},
		methods: {
			edit(key) {
				this.editableData[key] = this.tableData.filter(item => key === item.key)[0];
			},
			save(key) {
				Object.assign(this.tableData.filter(item => key === item.key)[0], this.editableData[key]);
				delete this.editableData[key];
			},
			editob() {
				this.obshow = false
				console.log('编辑实验目的')
			},
			saveob() {
				this.obshow = true
				console.log('保存实验目的')
			},
			editcont() {
				this.contshow = false
				console.log('编辑实验内容')
			},
			savecont() {
				this.contshow = true
				console.log('保存实验内容')
			},
			editthink() {
				this.thinkshow = false
				console.log('编辑实验思考')
			},
			savethink() {
				this.thinkshow = true
				console.log('保存实验思考')
			},
			generatePDF() {
				console.log('生成实验报告')
			}
		},
		mounted() {},
		created() {

		}
	}
</script>

<style scoped>
	.subtitle {
		padding: 10px;
		font-weight: 700;
		font-size: 20px;
	}

	.content {
		background-color: #f4f8ff;
		padding: 20px;
		font-size: 16px;
	}

	.subs {
		display: flex;
		flex-direction: column;
		margin: 10px;
	}

	.bottom {
		display: flex;
		justify-content: center;
	}
</style>