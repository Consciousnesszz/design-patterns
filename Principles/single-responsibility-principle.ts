// 单一职责原则(Single Responsibility Principle, SRP)：
// 一个类只负责一个功能领域中的相应职责，或者可以定义为：就一个类而言，应该只有一个引起它变化的原因。

// 实例：设计一个查询用户信息并以表格形式展示的程序
interface Connect {}

// worse: 单一类承担了三个不同的职责（可复用的数据库连接操作，用户查询相关，表格相关）
class CustomerDataChart {
  // 获取数据库连接
  getConnect(): Connect { return; }

  // 获取用户列表
  findCustomers(): Array<object> { return []; }

  // 创建表格
  creatChart(): void {}

  // 展示表格
  displayChart(): void {}
}

// better: 将三个职责分成三个类
class DBUtil {
  getConnect(): Connect { return; }
}

class CustomerDAO {
  findCustomers(): Array<object> { return []; }
}

class Chart {
  creatChart(): void {}

  displayChart(): void {}
}
