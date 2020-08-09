class DataHelper {
  dataKey: string;
  primaryKey: string;
  constructor(dataKey: string, primaryKey: string) {
    this.dataKey = dataKey;
    this.primaryKey = primaryKey;
  }
  // 读取全部本地数据
  readData(): any {
    let strData: string | null = localStorage.getItem(this.dataKey);
    let arrData: any = [];
    if (strData !== null) {
      arrData = JSON.parse(strData);
    }
    return arrData;
  }
  // 保存数据
  saveData(arrData: Array<Object>): void {
    const strData: string = JSON.stringify(arrData);
    localStorage.setItem(this.dataKey, strData);
  }
  // 添加数据
  addData(strCon: any): number {
    // 读取本地现有数据
    let arrData: any = this.readData();
    // 创建一个评论对象
    let obj: any = {
      content: strCon,
    };
    // 自动生成主键 id
    let newId =
      arrData.length > 1 ? arrData[arrData.length - 1][this.primaryKey] + 1 : 1;
    // 将主键添加到obj中
    obj[this.primaryKey] = newId;
    // 将对象添加到数组中
    arrData.push(obj);
    // 将数据保存到本地
    this.saveData(arrData);
    return newId;
  }
  // 根据id删除
  removeById(id: string | number): boolean {
    // 读取数组
    let arrData: any = this.readData();
    // 查找要删除的下标，保存
    const index = arrData.findIndex((ele: any) => {
      return ele[this.primaryKey] == id;
    });
    // 如果找到了，
    if (index > -1) {
      arrData.splice(index, 1);
      // 保存数组到本地
      this.saveData(arrData);
      return true;
    }
    return false;
  }
}

export default DataHelper;
