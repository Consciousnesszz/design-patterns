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
 * 思考 1:
 * 工厂方法模式中的工厂方法能否为静态方法？为什么？
 *
 * 不能。原则上工厂和产品是一一对应的，而静态方法不能继承，就不能形成与产品等级结构对应的工厂等级结构。
 *
 * 思考 2:
 * 有人说：可以在客户端代码中直接通过反射机制（通过配置类名生成类）来生成产品对象，在定义产品对象时使用抽象类型，
 * 同样可以确保系统的灵活性和可扩展性，增加新的具体产品类无须修改源代码，
 * 只需要将其作为抽象产品类的子类再修改配置文件即可，根本不需要抽象工厂类和具体工厂类。
 * 试思考这种做法的可行性？如果可行，这种做法是否存在问题？为什么？
 *
 * 可行。但实际工厂代码中会有很多和产品对应的代码，如数据库连接、创建日志文件等，
 * 如果将这些都交给一个工厂，势必造成结构复杂，不符合“单一原则”。
 */
