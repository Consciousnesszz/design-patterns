/**
 * 迪米特法则(Law of  Demeter, LoD) 或 最小知识法则（Least Knowledge Principle, LKP）：
 * 一个软件实体应当尽可能少地与其他实体发生相互作用。可以通过引入一个合理的第三者来降低现有对象之间的耦合度
 *
 * 在将迪米特法则运用到系统设计中时，要注意下面的几点：
 * 1. 在类的划分上，应当尽量创建松耦合的类，类之间的耦合度越低，就越有利于复用，
 *    一个处在松耦合中的类一旦被修改，不会对关联的类造成太大波及；
 * 2. 在类的结构设计上，每一个类都应当尽量降低其成员变量和成员函数的访问权限；
 * 3. 在类的设计上，只要有可能，一个类型应当设计成不变类；
 * 4. 在对其他类的引用上，一个对象对其他对象的引用应当降到最低。
 */

// 实例：按钮触发输入框，列表，文本变化

// worse：按钮直接和其他对象接触，导致关系复杂，拓展性差。
class Button {
  handleClick(): void {
    // change input...
    // change list...
    // change text...
  }
}

// better：引入专门控制交互的中间类 Mediator 来降低耦合度
class Mediator {
  static change(): void {
    // change input...
    // change list...
    // change text...
  }
}

class ButtonBetter {
  handleClick(): void {
    return Mediator.change();
  }
}
