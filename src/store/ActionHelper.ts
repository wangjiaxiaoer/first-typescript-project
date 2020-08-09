import DataHelper from './DataHelper';
import ItemData from '../model/ItemData';
import Category from '@/model/CateEnum';
class ActionHelp {
  // 负责数据处理
  dataHelper: DataHelper = new DataHelper('memoData', 'id');
  // 笔记数组
  memoList!: Array<ItemData>;
  // 构造函数，读取本地数据，并设置给 memoList
  constructor() {
    //  读取本地数据，将笔记数组保存到this.memoList中
    this.memoList = this.readData();
  }
  // 读取本地数据，并返回ItemData类型数组
  readData(): Array<ItemData> {
    // 读取本地object数组
    let arrObj = this.dataHelper.readData();
    // 遍历数组 转成 ItemData数组
    let arrItem = arrObj.map((ele: any) => {
      let item: ItemData = new ItemData();
      item.id = ele.id;
      item.categoryId = ele.categoryId;
      item.title = ele.title;
      item.content = ele.content;
      item.createTime = ele.createTime;
      return item;
    });
    // 返回itemData数组
    return arrItem;
  }

  // 负责业务处理,
  // 新增笔记
  add(item: ItemData): number {
    // 保存到本地 this.dataHelper.addData 并返回生成的id
    item.id = this.dataHelper.addData(item);
    // 将笔记添加到笔记数组中
    this.memoList.push(item);
    // 将笔记数组 重新保存到本地
    this.dataHelper.saveData(this.memoList);
    // 返回新笔记的 id
    return item.id;
  }
  // 修改笔记
  edit(item: ItemData): void {
    // 找出要修改的那条数据对象
    let editItem: ItemData | undefined = this.memoList.find(ele => {
      return ele.id == item.id;
    });
    // 修改对象的值，
    if (editItem) {
      editItem.categoryId = item.categoryId;
      editItem.title = item.title;
      editItem.content = item.content;
      // 覆盖本地的数据
      this.dataHelper.saveData(this.memoList)
    }
  }
  // 获取分类名称
  getCategoryName(cateId:Category): string { 
    const arrNames = ['工作','生活','学习']
    return arrNames[cateId]
  }
  // 删除笔记
  remove(id: number): void {
    // 找出要删除对象的下标
    let index: number = this.memoList.findIndex(ele => {
      return ele.id == id;
    });
    // 根据下标删除对象
    if (index > -1) {
      this.memoList.splice(index, 1);
      this.dataHelper.saveData(this.memoList);
    }
  }
}
export default ActionHelp;
