/**
 * 原型模式(Prototype  Pattern)：使用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。原型模式是一种对象创建型模式。
 */

// 通用实现
interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype implements Prototype {
  private attr: string = 'attr'; // 私有成员

  public setAttr(attr): void {
    this.attr = attr;
  }
  public getAttr(): string {
    return this.attr;
  }

  public clone() {
    const newConcretePrototype = new ConcretePrototype(); // 新建对象
    newConcretePrototype.setAttr(this.attr); // 将当前状态赋给新对象
    return newConcretePrototype; // 返回复制好的对象，完成克隆
  }
}

// 各语言自身的 clone 方法。如：java Object类提供的 clone()

/**
 * 思考
 * 能否将上述代码中的clone()方法写成：public Prototype clone() { return this; }？给出你的理由。
 * 不能，若是 this，则对象的引用未切断，不是真正意义上的克隆
 */

// 在拷贝类的成员变量时，要注意深浅克隆，对象地址引用

/**
 * 总结：
 * 主要优点：
  (1) 当创建新的对象实例较为复杂时，使用原型模式可以简化对象的创建过程，通过复制一个已有实例可以提高新实例的创建效率。
  (2) 扩展性较好，由于在原型模式中提供了抽象原型类，在客户端可以针对抽象原型类进行编程，
  而将具体原型类写在配置文件中，增加或减少产品类对原有系统都没有任何影响。
  (3) 原型模式提供了简化的创建结构，工厂方法模式常常需要有一个与产品类等级结构相同的工厂等级结构，而原型模式就不需要这样，
  原型模式中产品的复制是通过封装在原型类中的克隆方法实现的，无须专门的工厂类来创建产品。
  (4) 可以使用深克隆的方式保存对象的状态，使用原型模式将对象复制一份并将其状态保存起来，
  以便在需要的时候使用（如恢复到某一历史状态），可辅助实现撤销操作。

  * 主要缺点：
  (1) 需要为每一个类配备一个克隆方法，而且该克隆方法位于一个类的内部，当对已有的类进行改造时，需要修改源代码，违背了“开闭原则”。
  (2) 在实现深克隆时需要编写较为复杂的代码，而且当对象之间存在多重的嵌套引用时，为了实现深克隆，
  每一层对象对应的类都必须支持深克隆，实现起来可能会比较麻烦。

  * 适用场景
  (1) 创建新对象成本较大（如初始化需要占用较长的时间，占用太多的CPU资源或网络资源），
  新的对象可以通过原型模式对已有对象进行复制来获得，如果是相似对象，则可以对其成员变量稍作修改。
  (2) 如果系统要保存对象的状态，而对象的状态变化很小，或者对象本身占用内存较少时，可以使用原型模式配合备忘录模式来实现。
  (3) 需要避免使用分层次的工厂类来创建分层次的对象，并且类的实例对象只有一个或很少的几个组合状态，
  通过复制原型对象得到新实例可能比使用构造函数创建一个新实例更加方便。

  * 应用举例
  (1) windows 的复制粘贴功能
  (2) 编辑器的撤销，取消撤销功能
 */