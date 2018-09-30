/**
 * 依赖倒转原则(Dependency Inversion Principle, DIP)：
 * 抽象不应该依赖于细节，细节应当依赖于抽象。换言之，要针对接口编程，而不是针对实现编程。
 *
 * 依赖注入：当一个对象要与其他对象发生依赖关系时，通过抽象来注入所依赖的对象
 * 注入方式：构造注入，设值注入（Setter注入）和接口注入
 */

// 实例：将不同格式客户信息存入用户数据库

class DataCovert {
  // 抽象读取文件方法
  readFile(): void {}
}
class TxtDataConvert extends DataCovert {
  readFile(): void {} // 重写 readFile 方法，完成自身功能
}
class ExcelDataConvert {
  readFile(): void {}
}

// worse：硬编码数据格式。重复书写添加方法，新数据类型需更改代码
class CustomerDAO { // DAO：data access object，是一个面向对象的数据库接口
  addCustomerFromTxt(): void {
    return new TxtDataConvert().readFile();
  }
  addCustomerFromExcel(): void {
    return new ExcelDataConvert().readFile();
  }
}

// better：通过里氏代换，抽象数据转换类，通过依赖注入更改具体子类，实现开闭原则
// 模拟 config（不修改源码编译，只是修改配置文件来完成功能转换，是符合开闭原则的）
const config = {
  dataConvertType: TxtDataConvert
}
class CustomerDAOBetter {
  addCustomer(): void {
    return new config.dataConvertType().readFile();
  }
}

/**
 * 总结
 * 在上述重构过程中，我们使用了开闭原则、里氏代换原则和依赖倒转原则，
 * 在大多数情况下，这三个设计原则会同时出现，开闭原则是目标，里氏代换原则是基础，依赖倒转原则是手段，
 * 它们相辅相成，相互补充，目标一致，只是分析问题时所站角度不同而已。
 */
