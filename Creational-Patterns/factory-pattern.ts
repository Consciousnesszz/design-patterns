/**
 * 工厂模式(Factory Method Pattern)
 *
 * 定义一个用于创建对象的接口，让子类决定将哪一个类实例化。
 * 工厂方法模式让一个类的实例化延迟到其子类。工厂方法模式又简称为工厂模式(Factory Pattern)，
 * 又可称作虚拟构造器模式(Virtual Constructor Pattern)或多态工厂模式(Polymorphic Factory Pattern)。
 * 工厂方法模式是一种类创建型模式。
 *
 * 不同于简单工厂模式，工厂模式不再提供一个统一的工厂类来创建所有的产品对象，
 * 而是针对不同的产品提供不同的工厂，系统提供一个与产品等级结构对应的工厂等级结构。
 */

// 示例
// 抽象产品
abstract class Product {
  public abstract sameMethod(): void;
}

class ConcreteProduct extends Product {
  sameMethod() {}
  differentMethod(): void {}
}

// 抽象工厂：可以是接口，也可以是抽象类或者具体类
interface Factory {
  factoryMethod(): Product;
}

class ConcreteFactory implements Factory {
  factoryMethod():Product {
    return new ConcreteProduct();
  }
}
// 调用
// 可以通过配置文件来存储具体工厂类ConcreteFactory的类名，更换新的具体工厂时无须修改源代码，系统扩展更为方便。
const factory: Factory = new ConcreteFactory();
const product: Product = factory.factoryMethod();

/**
 * 思考
 * 工厂方法模式中的工厂方法能否为静态方法？为什么？
 * 不能。原则上工厂和产品是一一对应的，而静态方法不能继承，就不能形成与产品等级结构对应的工厂等级结构。
 */
