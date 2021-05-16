/**
 * 格式化字符串
 * @param {String} str 原始字符串
 * @returns
 */
function formatString(str) {
  const result = String(str).replaceAll('"', '""')
  return `"${result}"`
}
/**
 * 导出csv文件
 * @param {String} params.fileName 下载文件名
 * @param {Array} params.tableData 表格内容
 * @param {Object} params.columns 表头信息
 * @param {Array} params.tableList 要导出的列
 */
function export2CSV(params) {
  const { fileName = '导出文件', tableData = [], columns = {}, tableList = [] } = params || {}
  const headerList = tableList.map(key => this.formatString(columns[key] || key))
  const body = tableData.map(item => {
    const res = tableList.map(key => this.formatString(item[key] || ''))
    return res
  })
  const str = [headerList, ...body].reduce((pre, curr) => {
    const res = curr.join(',') + '\n'
    return pre + res
  }, '')
  const blob = new Blob(['\ufeff' + str], { type: 'text/csv,charset=UTF-8' })
  const url = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.download = `${fileName}.csv`
  link.href = url
  link.click()
}
