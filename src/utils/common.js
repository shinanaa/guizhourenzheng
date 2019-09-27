import XLSX from 'xlsx'
import FileSaver from 'file-saver'
// 院系以及专业选择树的查询提交数据过滤
export function filterDataIds(ids) {
  const newIds = []
  const pidLength1 = [] // 院系
  const pidLength2 = [] // 专业
  const pidLength3 = [] // 学年
  for (let i = 0; i < ids.length; i++) {
    const item = ids[i]
    if (item.hasOwnProperty('children')) { // 判断每一条数据是否含有children属性
      const pid = item['id']
      const pidLength = pid.split('_').length // 通过判断id的长短，来区分院系和专业，并分别添加到对应的列表中
      if (pidLength === 1) {
        pidLength1.push(item)
      } else {
        pidLength2.push(item)
      }
    } else {
      pidLength3.push(item) // 没有children属性，直接添加到学年列表中
    }
  }
  // 从1里 删 2 和3  删2 用儿子比对删  删3 就得用 id比对删
  for (let i = 0; i < pidLength1.length; i++) {
    const item = pidLength1[i]
    // 删2 院系的子项中与专业重合的，从专业数组中的此项删除
    for (let j = pidLength2.length - 1; j >= 0; j--) {
      if (item['children'].indexOf(pidLength2[j]) > -1) {
        pidLength2.splice(j, 1)
      }
    }
    // 删3 若学年的id中存在院系的id，将该学年从学年数组中删除
    for (let k = pidLength3.length - 1; k >= 0; k--) {
      if (pidLength3[k].id.indexOf(item.id) > -1) {
        pidLength3.splice(k, 1)
      }
    }
  }
  // 从2 里删 3 当只有专业和学年选中时，若专业的子项和学年有重合，将该学年从学年数组中删除
  for (let i = 0; i < pidLength2.length; i++) {
    const item = pidLength2[i]
    for (let j = pidLength3.length - 1; j >= 0; j--) {
      if (item['children'].indexOf(pidLength3[j]) > -1) {
        pidLength3.splice(j, 1)
      }
    }
  }
  //  // 123 合并
  return newIds.concat(pidLength1, pidLength2, pidLength3)
}

// 报表下载
export function downloadExcel(tableID) {
  const wb = XLSX.utils.table_to_book(document.querySelector(tableID))
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(
      // Blob 对象表示一个不可变、原始数据的类文件对象。
      // Blob 表示的不一定是JavaScript原生格式的数据。
      // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      new Blob([wbout], { type: 'application/octet-stream' }),
      // 设置导出文件名称
      `${tableID.substr(1)}.xlsx`
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}

// 级联选择器 院系专业模式转换
export function valueToLabel(filterData, valueArr, labelArr) {
  filterData.map((item) => {
    if (item.value === valueArr[0]) {
      labelArr[0] = item.label
      item.children.map((major) => {
        if (major.value === valueArr[1]) {
          labelArr[1] = major.label
          major.children.map((schoolYear) => {
            if (schoolYear.value === valueArr[2]) {
              labelArr[2] = schoolYear.label
            }
          })
        }
      })
    }
  })
}

// 级联选择器 院系专业模式转换
export function labelToValue(filterData, college, major, schoolYear, valueArr) {
  filterData.map((item) => {
    if (item.label === college) {
      valueArr[0] = item.value
      item.children.map((majorItem) => {
        if (majorItem.label === major) {
          valueArr[1] = majorItem.value
          majorItem.children.map((schoolYearItem) => {
            if (schoolYearItem.label.indexOf(schoolYear) !== -1) {
              valueArr[2] = schoolYearItem.value
            }
          })
        }
      })
    }
  })
}
