/**
 * 里氏代换原则(Liskov Substitution Principle, LSP)：
 * 所有引用基类（父类）的地方必须能透明地使用其子类的对象。
 * 即：使用 Animal 类的地方，一定能够不影响程序的将 Animal 替换为 Dog, Cat, Tiger... ，反之不一定
 *
 * 在使用里氏代换原则时需要注意如下几个问题：
 * (1)子类的所有方法必须在父类中声明，或子类必须实现父类中声明的所有方法。
 *    根据里氏代换原则，为了保证系统的扩展性，在程序中通常使用父类来进行定义，
 *    如果一个方法只存在子类中，在父类中不提供相应的声明，则无法在以父类定义的对象中使用该方法。
 * (2)我们在运用里氏代换原则时，尽量把父类设计为抽象类或者接口，让子类继承父类或实现父接口，
 *    并实现在父类中声明的方法，运行时，子类实例替换父类实例，我们可以很方便地扩展系统的功能，
 *    同时无须修改原有子类的代码，增加新的功能可以通过增加一个新的子类来实现。
 *    * 里氏代换原则是开闭原则的具体实现手段之一。 *
 * (3)Java语言中，在编译阶段，Java编译器会检查一个程序是否符合里氏代换原则，
 *    这是一个与实现无关的、纯语法意义上的检查，但Java编译器的检查是有局限的。
 */

// 实例：存在 common user 和 vip user，完成他们的发送 email 功能
// worse: 针对 common user 和 vip user 重复书写 send email 方法
class CommonUser {
  name: 'commonUser'
  commonFn: () => {}
}

class VipUser {
  name: 'vipUser'
  vipFn: () => {}
}

class Email {
  sendCommonEmail(commonUser: new () => CommonUser): void {}
  sendVipEmail(vipUser: new () => VipUser): void {}
}

// better: 提炼出抽象 user 类，根据里氏代换，在调用时将父类替换为子类
class User {
  name: string
}

class CommonUserBetter extends User {
  constructor(params) {
    super()
    this.name = 'commonUser'
  }
  commonFn: () => {}
}

class VipUserBetter extends User {
  constructor(params) {
    super()
    this.name = 'vipUser'
  }
  vipFn: () => {}
}

class EmailBetter {
  sendEmail(user: new() => User): void {}
}
