### Feats
> 覆盖物状态管理：显示/隐藏、添加/删除、更新、清空、查找覆盖物
- `OverlyState` @lymp/core
- `VOverlyState` @lymp/vue

{
    code: 0,
    data: {
        time: ['20', '30'],
        charts: [
            {
            key: 'Symbol'
            unit: 'm',
            legend: '水位',
            data: [20, 30]
            }
        ]
    }
}

{
   xData: data.time,
   series: data.chart.map(item => {
       return {
           name: item.legend,
           type: 'line',
           data: item.data
       }
   }) 
}