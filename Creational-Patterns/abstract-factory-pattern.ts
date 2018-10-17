/**
 *
 * 抽象工厂模式（Abstract Factory Pattern)：
 * 提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。抽象工厂模式又称为Kit模式，它是一种对象创建型模式。
 *
 * 关于产品结构等级和产品类：
   (1) 产品等级结构：产品等级结构即产品的继承结构，如一个抽象类是电视机，抽象电视机是父类，而具体品牌的电视机是其子类。
   (2) 产品族：在抽象工厂模式中，产品族是指由同一个工厂生产的，位于不同产品等级结构中的一组产品，如海尔冰箱和海尔电视机
   就是处于同一产品族的不同产品级。
 *
 * 设计动机：
   当设计同一产品族的产品时，工厂模式新增产品需要成对增加类，同时需要额外代码管理产品族关系。于是我们将产品族抽象出来，
   不同的工厂对应同一产品族。如：海尔生产冰箱、洗衣机，西门子也生产冰箱、洗衣机，其中海尔和西门子就是我们的工厂。
 */

// 结构示例
// A产品级
interface AbstractProductA {}
class ConcreteProductA1 implements AbstractProductA {}
class ConcreteProductA2 implements AbstractProductA {}

// B产品级
interface AbstractProductB {}
class ConcreteProductB1 implements AbstractProductB {}
class ConcreteProductB2 implements AbstractProductB {}

interface Factory {
  creatProductA(): AbstractProductA;
  creatProductB(): AbstractProductB;
}
// 1号产品族
class FacrotyForType1 implements Factory {
  creatProductA() {
    return new ConcreteProductA1();
  }
  creatProductB() {
    return new ConcreteProductB1();
  }
}

// 2号产品族
class FacrotyForType2 implements Factory {
  creatProductA() {
    return new ConcreteProductA2();
  }
  creatProductB() {
    return new ConcreteProductB2();
  }
}

/**
 * 思考：抽象工厂模式是否符合“开闭原则”？【从增加新的产品等级结构和增加新的产品族两方面进行思考。】
 * 从增加新的产品族是符合的，而从增加产品等级结构是不符合的。这也是抽象工厂模式最大的缺点。
 * 在抽象工厂模式中，增加新的产品族很方便，但是增加新的产品等级结构很麻烦。这种性质称为“开闭原则”的倾斜性。
 *
 * 正因为抽象工厂模式存在“开闭原则”的倾斜性，它以一种倾斜的方式来满足“开闭原则”，为增加新产品族提供方便，
 * 但不能为增加新产品结构提供这样的方便，因此要求设计人员在设计之初就能够全面考虑，不会在设计完成之后向系统中增加新的产品等级结构，
 * 也不会删除已有的产品等级结构，否则将会导致系统出现较大的修改，为后续维护工作带来诸多麻烦。
 */

/**
 * 总结：
 * 1. 主要优点
   (1) 抽象工厂模式隔离了具体类的生成，使更换一个具体工厂就变得相对容易。
   (2) 当一个产品族中的多个对象被设计成一起工作时，它能够保证客户端始终只使用同一个产品族中的对象。
   (3) 增加新的产品族很方便，无须修改已有系统，符合“开闭原则”。

   2. 主要缺点
   增加新的产品等级结构麻烦，需要对原有系统进行较大的修改，甚至需要修改抽象层代码，这显然会带来较大的不便，违背了“开闭原则”。

   3. 适用场景
   (1) 一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节，这对于所有类型的工厂模式都是很重要的，
       用户无须关心对象的创建过程，将对象的创建和使用解耦。
   (2) 系统中有多于一个的产品族，而每次只使用其中某一产品族。可以通过配置文件等方式来使得用户可以动态改变产品族，
       也可以很方便地增加新的产品族。
   (3) 属于同一个产品族的产品将在一起使用，这一约束必须在系统的设计中体现出来。
       同一个产品族中的产品可以是没有任何关系的对象，但是它们都具有一些共同的约束，如同一操作系统下的按钮和文本框，
       按钮与文本框之间没有直接关系，但它们都是属于某一操作系统的，此时具有一个共同的约束条件：操作系统的类型。
   (4) 产品等级结构稳定，设计完成之后，不会向系统中增加新的产品等级结构或者删除已有的产品等级结构。
 */

/**
 * 练习
 * Sunny软件公司欲推出一款新的手机游戏软件，该软件能够支持Symbian、Android和Windows Mobile等多个智能手机操作系统平台，
 * 针对不同的手机操作系统，该游戏软件提供了不同的游戏操作控制(OperationController)类和游戏界面控制(InterfaceController)类，
 * 并提供相应的工厂类来封装这些类的初始化过程。软件要求具有较好的扩展性以支持新的操作系统平台，
 * 为了满足上述需求，试采用抽象工厂模式对其进行设计。
 */
// 操作器产品级
interface OperationController {}
class SymbianOperationController implements OperationController {}
class AndroidOperationController implements OperationController {}
class WindowsMobileOperationController implements OperationController {}
// 接口产品级
interface InterfaceController {}
class SymbianInterfaceController implements InterfaceController {}
class AndroidInterfaceController implements InterfaceController {}
class WindowsMobileInterfaceController implements InterfaceController {}

interface GameFactory {
  initOperationController(): OperationController;
  initInterfaceController(): InterfaceController;
}
// Symbian 产品族
class SymbianGameFactory implements GameFactory {
  initInterfaceController() {
    return new SymbianInterfaceController();
  }
  initOperationController() {
    return new SymbianOperationController();
  }
}
// Android 产品族
class AndroidGameFactory implements GameFactory {
  initInterfaceController() {
    return new AndroidInterfaceController();
  }
  initOperationController() {
    return new AndroidOperationController();
  }
}
// Windows Mobile 产品族
class WindowsMobileGameFactory implements GameFactory {
  initInterfaceController() {
    return new WindowsMobileInterfaceController();
  }
  initOperationController() {
    return new WindowsMobileOperationController();
  }
}
