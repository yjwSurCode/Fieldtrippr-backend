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
