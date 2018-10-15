/**
 * 简单工厂模式(Simple Factory Pattern)：
 * 定义一个工厂类，它可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类。
 * 因为在简单工厂模式中用于创建实例的方法是静态(static)方法，
 * 因此简单工厂模式又被称为静态工厂方法(Static Factory Method)模式，它属于类创建型模式。
 */

// 示例
abstract class Product {
  // 公共方法
  public sameMethod():void {}
  // 抽象方法，不同产品各自实现
  public abstract diffrentMethod():void
}

class ProductA extends Product {
  public diffrentMethod() {
    // do something of a...
  }
}

class ProductB extends Product {
  public diffrentMethod() {
    // do something of b...
  }
}

class Factory {
  public static getProduct(type: string):Product {
    switch (type) {
      case 'A':
        return new ProductA();
      case 'B':
        return new ProductB();
    }
  }
}

// 调用
class Client {
  public product: Product;

  constructor() {
    this.product = Factory.getProduct('A');
    this.product.sameMethod();
    this.product.diffrentMethod();
  }
}


/**
 * 总结
 *  1. 主要优点
    (1) 实现了对象创建和使用的分离。
    (2) 对于一些复杂的类名，只需知道具体产品类所对应的参数即可创建，在一定程度减少了使用者的记忆量。
    (3) 通过引入配置文件，可以在不修改任何客户端代码的情况下更换和增加新的具体产品类，在一定程度上提高了系统的灵活性。

    2. 主要缺点
    (1) * 违反开闭原则，新增产品需要更改工厂内部判断逻辑。 *（重要）
    (2) 由于工厂类集中了所有产品的创建逻辑，职责过重，一旦不能正常工作，整个系统都要受到影响。
    (3) 使用简单工厂模式势必会增加系统中类的个数（引入了新的工厂类），增加了系统的复杂度和理解难度。
    (4) 简单工厂模式由于使用了静态工厂方法，造成工厂角色无法形成基于继承的等级结构。

    3. 适用场景
    (1) 工厂类负责创建的对象比较少，由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。
    (2) 客户端只知道传入工厂类的参数，对于如何创建对象并不关心。
 */


/**
 * 练习
 * 使用简单工厂模式设计一个可以创建不同几何形状（如圆形、方形和三角形等）的绘图工具，
 * 每个几何图形都具有绘制draw()和擦除erase()两个方法，要求在绘制不支持的几何图形时，提示一个UnSupportedShapeException。
 */

abstract class DrawTool {
  public abstract draw(): void;
  public abstract erase(): void;
}

class CircleDrawTool extends DrawTool {
  draw() {
    console.log('draw circle')
  }
  erase() {
    console.log('erase circle')
  }
}

class TriangleDrawTool extends DrawTool {
  draw() {
    console.log('draw triangle')
  }
  erase() {
    console.log('erase triangle')
  }
}

class DrawToolFactory {
  public static creat(type: string): DrawTool {
    console.log(`creat ${type}`)
    switch (type) {
      case 'circle':
        return new CircleDrawTool();
      case 'triangle':
        return new TriangleDrawTool();
    }
    // 如果未通过 switch 返回类
    console.log('UnSupportedShapeException');
  }
}

// 模拟调用
const config = {
  type: 'circle'
}

class DrawToolClient {
  public static main(): void {
    console.log('draw tool init');
    const drawTool = DrawToolFactory.creat(config.type);
    drawTool.draw();
    drawTool.erase();
  }
}
