<template>
	<div>
		<div ref="pdf_box">
			<div class="subtitle">一、实验目的</div>
			<div class="content">
				<div v-if="obshow">
					<span>{{ objective }}</span>
					<a-button type="primary" ghost @click="editob()" style="margin-left: 10px">编辑</a-button>
				</div>
				<div v-else>
					<a-textarea v-model:value="objective" placeholder="textarea with clear icon" allow-clear />
					<a-button type="primary" ghost @click="saveob()" style="margin-top: 5px">保存</a-button>
				</div>
			</div>
			<div class="subtitle">二、实验内容</div>
			<div class="content">
				<div v-if="contshow">
					<span>{{ content }}</span>
					<a-button type="primary" ghost @click="editcont()" style="margin-left: 10px">编辑</a-button>
				</div>
				<div v-else>
					<a-textarea v-model:value="content" placeholder="textarea with clear icon" allow-clear />
					<a-button type="primary" ghost @click="savecont()" style="margin-top: 5px">保存</a-button>
				</div>
			</div>
			<div class="subtitle">三、实验原理</div>
			<div class="content">
				蒙特卡洛方法是基于概率论和统计学的随机模拟方法，它可以用来求解各种复杂的数学问题，包括数值积分、概率分布、随机过程、优化问题等。<br />
				其基本思想是通过重复随机抽样和计算来估计未知参数或解决问题。
			</div>
			<div class="subtitle">四、实验步骤</div>
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
			<div class="subtitle">五、实验结果</div>
			<div>
				<a-divider orientation="left">选择实验实例</a-divider>
				<a-radio-group v-model:value="exp">
					<a-radio :style="radioStyle" :value="1">项目总成本</a-radio>
					<a-radio :style="radioStyle" :value="2">软件构建质量</a-radio>
					<a-radio :style="radioStyle" :value="3">软件销售量</a-radio>
					<a-radio :style="radioStyle" :value="4">软件缺陷修复</a-radio>
				</a-radio-group>
				<a-divider orientation="left">确定变量概率分布</a-divider>
				<div style="font-size: 18px; padding: 5px">{{ formula }}</div>
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
				<a-table :columns="columns" :data-source="tableData" bordered>
					<template #bodyCell="{ column, text, record }">
						<template v-if="['x1', 'x2'].includes(column.dataIndex)">
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
					<dataChart :x1="value1" :x2="value2" :y1="value3" :y2="value4"></dataChart>
				</div>
			</div>
			<div class="subtitle">六、实验思考</div>
			<div class="content">
				<div v-if="thinkshow">
					<span>{{ think }}</span>
					<a-button type="primary" ghost @click="editthink()" style="margin-left: 10px">编辑</a-button>
				</div>
				<div v-else>
					<a-textarea v-model:value="think" placeholder="textarea with clear icon" allow-clear />
					<a-button type="primary" ghost @click="savethink()" style="margin-top: 5px">保存</a-button>
				</div>
			</div>
		</div>
		<div class="bottom">
			<a-button type="primary" ghost @click="generatePDF()" style="margin-top: 5px">生成实验报告</a-button>
		</div>

	</div>
</template>
  
<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { cloneDeep } from 'lodash-es';
import dataChart from './test.vue';
export default {
	components: {
		dataChart,
	},
	data() {
		return {
			fileList: [],
			imageUrl: null,
			varnum: 2,
			obshow: true,
			objective: '通过蒙特卡洛方法，对一个软件开发项目进行风险分析，以预测项目的成本、进度和成功概率等方面的风险。',
			contshow: true,
			content:
				'在本次实验中，我们使用蒙特卡洛方法对软件开发项目进行风险分析，包括估计项目的成本、进度和成功概率等方面的风险。为模拟项目，我们选择了三个关键变量：开发时间、测试时间和项目成本。对于每个变量，我们使用某种分布来估计它的概率分布，并利用平台进行随机模拟和计算结果。',
			thinkshow: true,
			think: '请输入实验思考',
			exp: 1,
			editableData: [],
			dataSource1: [
				{
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
			dataSource2: [
				{
					key: '1',
					name: '变量3',
					distribution: '正态分布',
					x1: 0,
					x2: 0,
				},
				{
					key: '2',
					name: '变量4',
					distribution: '均匀分布',
					x1: 0,
					x2: 0,
				},
			],
			dataSource3: [
				{
					key: '1',
					name: '变量5',
					distribution: '正态分布',
					x1: 0,
					x2: 0,
				},
				{
					key: '2',
					name: '变量6',
					distribution: '均匀分布',
					x1: 0,
					x2: 0,
				},
			],
			dataSource4: [
				{
					key: '1',
					name: '变量1',
					distribution: '正态分布',
					x1: 0,
					x2: 0,
				},
				{
					key: '2',
					name: '变量2',
					distribution: '均匀分布',
					x1: 0,
					x2: 0,
				},
			],
			columns: [
				{
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
					children: [
						{
							title: '参数1',
							dataIndex: 'x1',
							key: 'x1',
						},
						{
							title: '参数2',
							dataIndex: 'x2',
							key: 'x2',
						},
					],
				},
				{
					title: 'operation',
					dataIndex: 'operation',
					width: 150,
				},
			],
			//生成pdf相关变量
			pdfSave: '',
			dialogVisible: '',
		};
	},
	computed: {
		value1() {
			switch (this.exp) {
				case 1:
					return this.dataSource1[0].x1;
				default:
					return 0;
			}
		},
		value2() {
			return this.dataSource1[0].x2;
		},
		value3() {
			return this.dataSource1[1].x1;
		},
		value4() {
			return this.dataSource1[1].x2;
		},
		formula() {
			switch (this.exp) {
				case 1:
					return '项目成本=项目天数*平均花费';
				case 2:
					return '3';
				case 3:
					return '2';
				default:
					return '4';
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
		//pdf
		createPdf() {
			console.log(document.body.scrollWidth);
			console.log(document.body.scrollHeight);
			let dom = this.$refs.pdf_box;
			this.getPdfFromHtml(dom, '报告');
		},

		edit(key) {
			this.editableData[key] = this.tableData.filter((item) => key === item.key)[0];
		},
		save(key) {
			Object.assign(this.tableData.filter((item) => key === item.key)[0], this.editableData[key]);
			delete this.editableData[key];
		},
		editob() {
			this.obshow = false;
			console.log('编辑实验目的');
		},
		saveob() {
			this.obshow = true;
			console.log('保存实验目的');
		},
		editcont() {
			this.contshow = false;
			console.log('编辑实验内容');
		},
		savecont() {
			this.contshow = true;
			console.log('保存实验内容');
		},
		editthink() {
			this.thinkshow = false;
			console.log('编辑实验思考');
		},
		savethink() {
			this.thinkshow = true;
			console.log('保存实验思考');
		},
		generatePDF() {
			console.log('生成实验报告');
			console.log(document.body.scrollWidth);
			console.log(document.body.scrollHeight);
			let dom = this.$refs.pdf_box;
			this.getPdfFromHtml(dom, '报告');
		},
		//pdf
		getPdfFromHtml(ele, pdfFileName) {
			html2Canvas(ele, {
				dpi: window.devicePixelRatio * 4,
				scale: 4,
				useCORS: true, //允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
				allowTaint: false,
				height: ele.offsetHeight,
				width: ele.offsetWidth,
				windowWidth: document.body.scrollWidth,
				windowHeight: document.body.scrollHeight,
			}).then((canvas) => {
				const _this = this;
				//未生成pdf的html页面高度
				var leftHeight = canvas.height;
				var a4Width = 595.28;
				var a4Height = 841.89;
				//一页pdf显示html页面生成的canvas高度;
				var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);
				//pdf页面偏移
				var position = 0;
				var pageData = canvas.toDataURL('image/jpeg', 1.0);
				var pdf = new JsPDF('x', 'pt', 'a4');
				var index = 1,
					canvas1 = document.createElement('canvas'),
					height;
				pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen');
				function createImpl(canvas) {
					if (leftHeight > 0) {
						index++;
						var checkCount = 0;
						if (leftHeight > a4HeightRef) {
							var i = position + a4HeightRef;
							for (i = position + a4HeightRef; i >= position; i--) {
								var isWrite = true;
								for (var j = 0; j < canvas.width; j++) {
									var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data;
									if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
										isWrite = false;
										break;
									}
								}
								if (isWrite) {
									checkCount++;
									if (checkCount >= 10) {
										break;
									}
								} else {
									checkCount = 0;
								}
							}
							height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
							if (height <= 0) {
								height = a4HeightRef;
							}
						} else {
							height = leftHeight;
						}

						canvas1.width = canvas.width;
						canvas1.height = height;

						var ctx = canvas1.getContext('2d');
						ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);
						var pageHeight = Math.round((a4Width / canvas.width) * height);
						if (position != 0) {
							pdf.addPage();
						}
						pdf.addImage(
							canvas1.toDataURL('image/jpeg', 1.0),
							'JPEG',
							0,
							20,
							a4Width,
							(a4Width / canvas1.width) * height
						);

						leftHeight -= height;
						position += height;
						if (leftHeight > 0) {
							setTimeout(createImpl, 500, canvas);
						} else {
							this.pdfSave = pdf.save(pdfFileName + '.pdf');
						}
					}
				}
				//当内容未超过pdf一页显示的范围，无需分页
				if (leftHeight < a4HeightRef) {
					pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, (a4Width / canvas.width) * leftHeight);
					this.dialogVisible = true;
					this.pdfSave = pdf.save(pdfFileName + '.pdf');
				} else {
					try {
						pdf.deletePage(0);
						setTimeout(createImpl, 500, canvas);
					} catch (err) {
						console.log(err);
					}
				}
			});
		},
	},
	mounted() { },
	created() { },
};
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
  