# MyALM

MyALM 是一个用于学习银行资产负债管理系统（ALM, Asset Liability Management）的知识库项目。

本项目聚焦国内银行 ALM 常见功能，主要覆盖：

- 流动性风险管理
- 利率风险管理
- 现金流展开
- 期限缺口与重定价缺口
- LCR、NSFR 等监管指标
- IRRBB、EVE、NII 等利率风险计量
- 压力测试与情景模拟
- 数据模型、批处理与数据质量

> 本项目暂不包含 FTP（内部资金转移定价）模块。FTP 在很多银行中由独立系统负责，本知识库只在必要时说明其与 ALM 的边界关系。

## 文档入口

知识库采用 HTML 编写：

```text
docs/index.html
```

推荐使用 VS Code Live Server、Python 简易 HTTP 服务或浏览器直接打开。

```bash
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000/docs/
```

## 项目结构

```text
MyALM/
├── README.md
├── AGENTS.md
└── docs/
    ├── index.html
    ├── sidebar.js
    ├── assets/
    │   ├── app.js
    │   └── styles.css
    └── modules/
        ├── overview.html
        ├── liquidity-risk.html
        ├── interest-rate-risk.html
        ├── cashflow.html
        ├── gap-analysis.html
        ├── lcr.html
        ├── nsfr.html
        ├── irrbb.html
        ├── eve.html
        ├── nii.html
        ├── stress-test.html
        ├── data-model.html
        ├── batch-processing.html
        └── glossary.html
```

## 维护方式

侧边栏目录由 `docs/sidebar.js` 统一维护。

新增模块时：

1. 在 `docs/modules/` 下新增 HTML 文件；
2. 在 `docs/sidebar.js` 的 `SIDEBAR_ITEMS` 中增加一项；
3. 页面会自动生成左侧目录。

## 学习目标

本项目目标不是复刻厂商产品，而是建立一套可持续扩展的 ALM 学习框架：

- 先理解业务问题；
- 再拆分系统模块；
- 再补充数据模型、指标口径和计算逻辑；
- 最后沉淀批处理、SQL、校验规则和案例。

## 模块边界

| 模块 | 是否纳入 | 说明 |
|---|---:|---|
| 流动性风险 | 是 | ALM 核心模块 |
| 利率风险 | 是 | ALM 核心模块 |
| 现金流展开 | 是 | 两类风险的共同基础 |
| LCR / NSFR | 是 | 国内银行常见监管指标 |
| IRRBB | 是 | 银行账簿利率风险 |
| EVE / NII | 是 | 利率风险核心计量结果 |
| FTP | 否 | 作为独立系统处理 |
| 管理会计绩效 | 否 | 与 ALM 有交集，但不是本项目重点 |
