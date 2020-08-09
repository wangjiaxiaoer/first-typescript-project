import Category from './CateEnum'
class ItemData {
  id!: number
  categoryId!: Category
  title!: string
  content!: string
  createTime!: string
  constructor(id: number = -1, categoryId: Category = -1, title: string = '', content: string = '') {
    this.id = id
    // 此处需要使用枚举类型 代表 文章分类
    this.categoryId = categoryId
    this.title = title
    this.content = content
    this.createTime = this.toDateStr(Date.now())
  }
  // 格式化时间
  toDateStr(time: number): string {
    let date = new Date(time)
    let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    return str
  }
}
// 导出
export default ItemData
