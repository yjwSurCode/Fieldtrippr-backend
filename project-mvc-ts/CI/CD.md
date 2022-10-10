CI/CD

    CI - 持续集成（Continuous Integration）
    CD - 持续交付 (Continuous Delivery)
    CD - 持续部署 (Continuous Deployment)


基本概念

workflow(工作流程)：指整个持续集成的流程，包含执行脚本任务、执行触发事件等
Events （事件）：触发流程的钩子，例如提交代码触发，新建 Issues 触发等等。
Jobs (任务)：每一个工作流程包含一个或多个任务，任务按顺序执行，每一个任务都会执行 shell 脚本。
Steps (步骤)：每一个 Job 包含一个或多个 Step, Step 按顺序执行。
Actions（动作): 每一个 Step 包含一个或多个 Action, 按顺序执行。
Runners（执行环境): workflow 运行时的服务器，每一个 Runner 可以运行一个 Job.


workflow 文件采用的是 YAML 语言编写，如果你还不了解，可以先看看 YAML 语言教程。
(https://www.ruanyifeng.com/blog/2016/07/yaml.html)



name: release
on: [push] # 仓库提交时触发
jobs:
  release-job: # 发布任务
    runs-on: ubuntu-latest # 运行系统环境
    steps: # 步骤
      - uses: actions/checkout@v2 # 使用公共的 action
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: echo '发布' # shell 脚本
复制代码
上面代码中，name 为 workflow 名称，on 指定了触发事件，jobs 下面我们自定义了一个 release-job 任务，任务指定了运行环境是 ubuntu, 同时，任务的执行步骤，第一个 uses 表示使用公共 actions/checkout@v2 签出代码，这一步就相当于把 github 仓库的代码拉到当前环境磁盘中，第二个 uses 表示在当前环境安装 nodejs 同时使用 with 指定了 node 版本，最后使用 run 执行自定义 shell 脚本。






const mapStateToProps = (state) => {
  console.log("pp1", state.user.selectIndex);
  return {
    index: state.user.selectIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switch: (v) => {
      const action = asyncSwitchAction(v);
      dispatch(action);
    },
    minus: () => {
      const action = asyncAdd(1);
      dispatch(action);
    },
  };
};

export default class TabbarComponent extends Component {
  aa() {
    console.log("11111");
  }
  render() {
    // const { index ,switch} = this.props;

    console.log(this.props, "pp--this.props");

    // console.log(state,switch, "p---number, add, minus");
    return (
      <Text>
        <Text style={{ fontSize: "100px" }} onClick={this.aa.bind(this, 1)}>
          切换1
        </Text>
        {/* {(this.props as any).index}
        <Text onClick={(this.props as any).switch(1)}>切换</Text>
        <Button onClick={(this.props as any).switch(2)}>切换</Button>
        <Button onClick={(this.props as any).switch(3)}>切换</Button> */}
        {/* <button onClick={add}>+</button>
        <span>{number}</span>
        <button onClick={minus}>-</button> */}
      </Text>
    );
  }
}

// const ClassComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TabbarComponent);

// export default ClassComponent;
















import { Component } from "react";
import Taro from "@tarojs/taro";
import { Text, View, Button, CoverView, CoverImage } from "@tarojs/components";

import { add, asyncAdd, asyncSwitchAction } from "../store/actions";
import { StoreStatus, UserStatus } from "../store/types/index";
import { connect } from "react-redux";

import "./index.scss";

export default class Tabbar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { name: "ories" };
  // }
  //   constructor(){}-在这里初始化state
  // shouldComponentUpdate(){}-return false阻止更新
  // render()-创建虚拟dom
  // componentDidMount(){}-组件已出现在页面
  // componentDidUpdate(){}-组件已更新
  // componentWillUnmount(){}-组件将死
  state = {
    selected: 0,
    color: "#000000",
    selectedColor: "#DC143C",
    list: [
      //TODO 这里的path必须在主包
      {
        text: "首页",
        pagePath: "../../pages/home/index",
        iconPath: "../assets/home.png",
        selectedIconPath: "../assets/select-home.png",
      },
      {
        text: "展示",
        pagePath: "../../pages/exhibition-list/index",
        iconPath: "../assets/home.png",
        selectedIconPath: "../assets/select-home.png",
      },
      {
        text: "我的",
        pagePath: "../../pages/my/index",
        iconPath: "../assets/doctor.png",
        selectedIconPath: "../assets/select-doctor.png",
      },
    ],
  };

  componentDidMount() {
    // const dispatch = useDispatch();
    // const user: UserStatus = useSelector((state: StoreStatus) => state.user);
    // console.log(user, "ppppp");
  }

  aa() {
    console.log(1);
  }

  switchTab(index, url) {
    // this.setSelected(index);
    Taro.switchTab({ url });
    this.setState({
      selected: index,
    });
  }

  setSelected(idx: number) {}

  render() {
    const { list, selected, color, selectedColor } = this.state;

    return (
      <CoverView className="tab-bar">
        <Text style={{ fontSize: "100px" }} onClick={this.aa.bind(this, 1)}>
          切换1
        </Text>
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              111111
              <CoverImage
                style={{ width: "20px", height: "20px" }}
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              {index}
              <CoverView
                style={{
                  width: "20px",
                  height: "20px",
                  // color: selected === index ? selectedColor : color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
