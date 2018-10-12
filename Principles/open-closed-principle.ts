// 开闭原则(Open-Closed Principle, OCP)：
// 一个软件实体应当对扩展开放，对修改关闭。即软件实体应尽量在不修改原有代码的情况下进行扩展。

// 实例：设计一个能展示不同表格的程序
class Chart {
  display(): void {}
}
class PieChart extends Chart {}
class BarChart extends Chart {}
class LineChart extends Chart {}

// worse: 硬编码判断类型，增加 line chart 需变动判断代码
class ChartDisplay {
  static displayChart(type: string): void {
    if (type === 'pie') {
      return new PieChart().display();
    } else if (type === 'bar') {
      return new BarChart().display()
    }
  }
}

ChartDisplay.displayChart('pie');


// better: 增加抽象类型 chart ，调用时再确定子类
class ChartDisplayBetter {
  static displayChart(ChartClass: new () => Chart): void {
    return new ChartClass().display();
  }
}

ChartDisplayBetter.displayChart(LineChart);
