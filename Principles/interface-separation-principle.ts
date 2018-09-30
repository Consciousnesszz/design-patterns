// 接口隔离原则(Interface  Segregation Principle, ISP)：
// 使用多个专门的接口，而不使用单一的总接口，即客户端不应该依赖那些它不需要的接口。

// worse：单一总接口，不得不实现接口中所有方法
interface CustomerDataDisplay {
  dataRead(): object

  transformToJSON(data: object): string

  creatChart(): void

  displayChart(): void
}

// better：定制接口，角色隔离
interface DataHandler {
  dataRead(): object
}
interface JSONTransform {
  transformToJSON(data: object): string
}
interface ChartHandler {
  creatChart(): void

  displayChart(): void
}

class Customer implements DataHandler, ChartHandler {
  dataRead(): object { return {}; }

  creatChart(): void {}

  displayChart(): void {}
}

/**
 * 在使用接口隔离原则时，我们需要注意控制接口的粒度，
 * 接口不能太小，如果太小会导致系统中接口泛滥，不利于维护；
 * 接口也不能太大，太大的接口将违背接口隔离原则，灵活性较差，使用起来很不方便。
 * 一般而言，接口中仅包含为某一类用户定制的方法即可，不应该强迫客户依赖于那些它们不用的方法。
 */
