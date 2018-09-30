/**
 * 合成复用原则(Composite Reuse Principle, CRP)：
 * 尽量使用对象组合，而不是继承来达到复用的目的。
 *
 * 继承的问题：
 * 1. 继承复用会破坏系统的封装性，一旦基类发生改变，会影响所有子类
 * 2. 从基类继承来的方法是静态的，不能在运行时发生改变，灵活性不足
 * 3. 继承只能在有限环境内使用（如类没有被声明为不能继承）
 *
 *  一般而言，如果两个类之间是“Has-A”的关系应使用组合或聚合，如果是“Is-A”关系可使用继承。
 * "Is-A"是严格的分类学意义上的定义，意思是一个类是另一个类的"一种"；
 * 而"Has-A"则不同，它表示某一个角色具有某一项责任。
 */

class DBUtil {
  getConnection(): Object { return {}; }
}

class OracleDBUtil extends DBUtil {
  // 重写方法，实现自身功能
  getConnection(): Object { return {}; }
}

// wrose：将 customer DAO 作为 DBUtil 的子类，调用 DBUtil 方法，当新增数据库 OracleDBUtil 时违反开闭原则
class CustomerDAO extends DBUtil {
  findCustomer(): Array<Object> { return []; }
}

// better：将 DBUtil 类注入到 CutomerDAO 中，实现继承关系到关联关系的转变
// 当新增数据库类型时，通过里氏代换，将 DBUtil 替换为其子类即可
class CustomerDAOBetter {
  constructor(params) {
    // 构造注入
    this.DBUtil = params.DButil
  }

  DBUtil: DBUtil

  // setter 注入
  setUtil(newDBUtil: DBUtil) { this.DBUtil = newDBUtil}

  getConnection(): Object { return this.DBUtil.getConnection(); }

  findCustomer(): Array<Object> { return []; }
}
