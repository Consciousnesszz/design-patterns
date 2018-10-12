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
