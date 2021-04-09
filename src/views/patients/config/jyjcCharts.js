let jyjcList = [
  {
    title: '血压',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-blood-pressure/list',
    saveTableUrl: '/cdms/assessment/detect-blood-pressure/',
    getChartUrl: '/cdms/assessment/detect-charts/blood-pressure',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'morningValue',
        name: '早',
        width: '64px'
      },
      {
        key: 'noonValue',
        name: '中',
        width: '64px'
      },
      {
        key: 'nightValue',
        name: '晚',
        width: '64px'
      }
    ],
    tableData: []
  },
  {
    title: '心率',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-heart-rate/list',
    saveTableUrl: '/cdms/assessment/detect-heart-rate/',
    getChartUrl: '/cdms/assessment/detect-charts/heart-rate',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'morningValue',
        name: '早',
        width: '64px'
      },
      {
        key: 'noonValue',
        name: '中',
        width: '64px'
      },
      {
        key: 'nightValue',
        name: '晚',
        width: '64px'
      }
    ],
    tableData: []
  },
  {
    title: '血脂尿酸',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-blood-lipids-uric-acid/list',
    saveTableUrl: '/cdms/assessment/detect-blood-lipids-uric-acid/',
    getChartUrl: '/cdms/assessment/detect-charts/lipids-uric-acid',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'tc',
        name: '总胆固醇TC\n(mmol/L)',
        width: '102px'
      },
      {
        key: 'ldl',
        name: '低密度脂蛋白LDL-C\n(mmol/L)',
        width: '150px'
      },
      {
        key: 'tg',
        name: '甘油三酯TG\n(mmol/L)',
        width: '98px'
      },
      {
        key: 'lpA',
        name: '脂蛋白LP-A',
        width: '96px'
      },
      {
        key: 'hdlC',
        name: '高密度脂蛋白HDL-C\n(mmol/L)',
        width: '155px'
      },
      {
        key: 'bloodUricAcid',
        name: '血尿酸',
        width: '60px'
      },
      {
        key: 'creatineKinase',
        name: '肌酸激酶CK',
        width: '90px'
      }
    ],
    tableData: []
  },
  {
    title: '血糖',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-blood-sugar/list',
    saveTableUrl: '/cdms/assessment/detect-blood-sugar/',
    getChartUrl: '/cdms/assessment/detect-charts/blood-sugar',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'fastingBloodGlucose',
        name: '空腹血糖\n(mmol/L)',
        width: '126px'
      },
      {
        key: 'twoHoursPostprandial',
        name: '餐后2小时血糖\n(mmol/L)',
        width: '122px'
      },
      {
        key: 'randomBloodSugar',
        name: '随机血糖\n(mmol/L)',
        width: '119px'
      },
      {
        key: 'glycatedHemoglobin',
        name: '糖化血红蛋白(%)',
        width: '129px'
      },
      {
        key: 'cpeptide',
        name: 'C肽',
        width: '112px'
      },
      {
        key: 'urineMicroalbumin',
        name: '尿微量白蛋白\n(mg/L)',
        width: '126px'
      }
    ],
    tableData: []
  },
  {
    title: '肝功能',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-liver-function/list',
    saveTableUrl: '/cdms/assessment/detect-liver-function/',
    getChartUrl: '/cdms/assessment/detect-charts/liver-function',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'alt',
        name: '谷丙转氨酶 ALT\n(U/L)',
        width: '151px'
      },
      {
        key: 'ast',
        name: '谷草转氨酶 AST\n (U/L)',
        width: '135px'
      },
      {
        key: 'totalBilirubin',
        name: '总胆红素TBL',
        width: '144px'
      },
      {
        key: 'directBilirubin',
        name: '直接胆红素',
        width: '136px'
      },
      {
        key: 'indirectBilirubin',
        name: '间接胆红素',
        width: '144px'
      }
    ],
    tableData: []
  },
  {
    title: '肾功能',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-kidney-function/list',
    saveTableUrl: '/cdms/assessment/detect-kidney-function/',
    getChartUrl: '/cdms/assessment/detect-charts/kidney-function',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'serumCreatinine',
        name: '血肌酐Cr\n(umol/L)',
        width: '179px'
      },
      {
        key: 'twentyFourHourUrineProtein',
        name: '24h尿蛋白\n(mg)',
        width: '179px'
      },
      {
        key: 'glomerularFiltrationRate',
        name: '肾小球滤过率\n(GFR, ml/min) ',
        width: '179px'
      },
      {
        key: 'creatinineClearanceRate',
        name: '肌酐清除率\n(CrCL，ml/min)',
        width: '179px'
      }
    ],
    tableData: []
  },
  {
    title: '同型半胱氨酸',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-homocysteine/list',
    saveTableUrl: '/cdms/assessment/detect-homocysteine/',
    getChartUrl: '/cdms/assessment/detect-charts/homocysteine',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'homocysteineValue',
        name: '同型半胱氨酸\n(umol/L)',
        width: '210px'
      }
    ],
    tableData: []
  },
  {
    title: '电解质',
    showChart: false,
    getTableUrl: '/cdms/assessment/detect-electrolyte/list',
    saveTableUrl: '/cdms/assessment/detect-electrolyte/',
    getChartUrl: '/cdms/assessment/detect-charts/electrolyte',
    insert: false,
    tableProps: [
      {
        key: 'detectDate',
        name: '日期',
        width: '86px'
      },
      {
        key: 'calcium',
        name: '钙',
        width: '50px'
      },
      {
        key: 'phosphorus',
        name: '磷',
        width: '50px'
      },
      {
        key: 'tfOhVitd',
        name: '25-OH-维生素D\n(25-OH-Vitd)',
        width: '130px'
      }
    ],
    tableData: []
  }
]
export default jyjcList
