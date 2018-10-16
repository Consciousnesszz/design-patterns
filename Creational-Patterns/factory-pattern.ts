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

/**
 * 总结：
 * 工厂方法模式是简单工厂模式的延伸，它继承了简单工厂模式的优点，同时还弥补了简单工厂模式的不足。
 * 工厂方法模式是使用频率最高的设计模式之一，是很多开源框架和API类库的核心模式。

    1. 主要优点
    (1) 隐藏细节，职责单一。
    (2) 多态设计，让工厂可以自主确定创建何种产品对象。
    (3) 符合开闭原则，拓展方便。

    2. 主要缺点
    (1) 添加新产品需要编写新的具体产品类和对应的具体工厂类，类的个数成对增加。添加了系统复杂度，给系统带来额外开销。
    (2) 抽象层增加了系统的抽象性和理解难度，且在实现时可能需要用到DOM、反射等技术，增加了系统的实现难度。

    3. 适用场景
    (1) 客户端不知道它所需要的对象的类。
    (2) 抽象工厂类通过其子类来指定创建哪个对象。
 */

/**
 * 练习
   使用工厂方法模式设计一个程序来读取各种不同类型的图片格式，针对每一种图片格式都设计一个图片读取器，
   如GIF图片读取器用于读取GIF格式的图片、JPG图片读取器用于读取JPG格式的图片。需充分考虑系统的灵活性和可扩展性。
 */

interface Reader {
  read(): void;
}

class GIFReader implements Reader {
  public read() {
    console.log('reading gif');
  }
}

class JPGReader implements Reader {
  public read() {
    console.log('reading jpg');
  }
}

abstract class ReaderFactory {
  public abstract creatReader(): Reader;

  // 将业务方法抽象到工厂，使客户端不用接触具体产品类。
  public read(): void {
    const reader = this.creatReader();
    reader.read();
  }
}

class GIFReaderFactory extends ReaderFactory {
  public creatReader() {
    // 创建细节，省略...
    console.log('init gif reader');
    return new GIFReader();
  }
}

class JPGReaderFactory extends ReaderFactory {
  public creatReader() {
    // 创建细节，省略...
    console.log('init jpg reader');
    return new JPGReader();
  }
}

// 模拟调用
class Client {
  public main():void {
    const factory = new GIFReaderFactory();
    // 客户端无需触碰具体产品类
    factory.read();
  }
}
