/**
 * 单例模式(Singleton Pattern)：
 * 确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类，
 * 它提供全局访问的方法。单例模式是一种对象创建型模式。
 *
 * 3要点：单一实例、自行实例化、提供给整个系统。
 */

// 简易单例模式
class Singleton {
  // 私有实例和创建方法
  private static instance: Singleton = null;
  private constructor() {
    //...
  }

  public static getInstance(): Singleton {
    if (this.instance === null) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

// 用例：
// new Singleton() // 外部调用 new 会报错，因构造函数为内部私有
Singleton.getInstance(); // 正确调用方式

/**
 * 思考：为什么要将成员变量 instance 定义为静态变量？
 * 答：因 getInstance 需作为静态方法，而静态方法只能访问静态变量。
 */

/**
 * 简易单例模式的不足：
 * 当在支持多线程模式的环境同时调用两次 getInstance 时，会分配两个线程进行单例的初始化，造成单例的重复。
 *
 * 解决方案：
 * 1. 饿汉式单例，在类初始化时即进行实例的生成。缺点是不管类有无使用都生成实例，会造成内存的浪费。
 * 2. 懒汉式单例，在实例生成时加锁，防止多线程调用。缺点是可能会导致系统运行效率降低。
 */

// 饿汉式单例
class EagerSingleton {
  // 初始化即进行实例生成
  private static instance: EagerSingleton = new EagerSingleton();
  private constructor() {
    // ...
  }

  public static getInstance(): EagerSingleton {
    return this.instance;
  }
}

// 懒汉式单例
// ts 使用变量模拟 java 中的 synchronized 关键字。当多线程调用时，修改全局变量通知其他线程。
let generating = false;
class LazySingleton {
  private static instance: LazySingleton = null;
  private constructor() {
    // ...
  }

  // ts 使用变量模拟 java 中的 synchronized 关键字
  public static getInstance(): LazySingleton {
    if (this.instance === null && !generating) {
      generating = true;
      this.instance = new LazySingleton();
      generating = false;
    }

    /*
    // java 代码
    // 第一重判断
    if (instance == null) {
      // 锁定代码块
      synchronized (LazySingleton.class) {
        // 第二重判断：二重判断是为了在其他被锁定而延迟执行的代码执行时，确认是否生成实例
        if (instance == null) {
          instance = new LazySingleton(); //创建单例实例
        }
      }
    }
    */

    return this.instance;
  }
}

/**
 * 最终解决方案：Initialization Demand Holder (IoDH)
 * 优点：既可以实现延迟加载，又可以保证线程安全，不影响系统性能
 * 缺点：用到了 ‘静态内部类’ 的语法，只能在 java 环境使用

  // java代码  Initialization on Demand Holder
  class Singleton {
    private Singleton() {
    }

    private static class HolderClass {
      private final static Singleton instance = new Singleton();
    }

    public static Singleton getInstance() {
      return HolderClass.instance;
    }

    public static void main(String args[]) {
      Singleton s1, s2;
      s1 = Singleton.getInstance();
      s2 = Singleton.getInstance();
      System.out.println(s1==s2); // true
    }
  }
 */

