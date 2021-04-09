<template>
  <div class="charts">
    <div :ref="id" :class="className" :style="graphStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'LineGraph',
  props: {
    id: {
      type: String,
      default: 'line'
    },
    className: {
      type: String,
      default: ''
    },
    graphStyle: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      chartOption: null
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    'chartOption': function() {
      this.init()
    }
  },
  methods: {
    init() {
      this.$echarts.dispose(this.$refs[ this.$props.id ])
      this.chart = this.$echarts.init(this.$refs[ this.$props.id ]);
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'left'
        },
        grid: {
          top: '20%',
          left: '1%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        }
      })
      this.showLoading()
      if (this.chartOption) {
        this.hideLoading()
        this.chart.setOption(this.chartOption)
      }
    },
    showLoading: function() {
      this.chart.showLoading({
          text: '暂无数据'
          /*color: '#ffffff',
          textColor: '#8a8e91',
          maskColor: 'rgba(255, 255, 255, 0.8)'*/
        }
      )
    },
    hideLoading: function() {
      this.chart.hideLoading();
    }
  }
}
</script>
