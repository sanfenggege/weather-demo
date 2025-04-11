# 天气预报应用 - 使用指南

## 项目简介

这是一个基于 React 和 TypeScript 开发的天气预报单页应用，可以查询中国城市未来7天的天气情况，包括温度、天气状况等信息，并支持城市切换功能。

## 功能特点

- 查询任意中国城市7天天气预报
- 实时天气数据展示
- 城市搜索自动补全
- 响应式设计，适配不同设备
- 天气图标可视化展示

## 技术栈

- React 19
- TypeScript
- Vite 构建工具
- Axios HTTP客户端
- CSS模块化

## 快速开始

### 环境要求

- Node.js 16+
- npm 8+ 或 yarn 1.22+

### 安装步骤

1. 克隆项目仓库

```bash
git clone https://github.com/your-repo/weather-app.git
cd weather-app
```plaintext

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 配置环境变量
   请先前往[和风天气官网](https://console.qweather.com/home?lang=zh)注册账号，新建项目并且完成JWT认证，创建自己的JWT_TOKEN

在项目根目录创建 `.env` 文件，内容如下：

```ini
VITE_HEWEATHER_API_HOST=https://api.weather.com
VITE_HEWEATHER_TOKEN=your_api_token_here
```

1. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

应用将在 [http://localhost:5173](http://localhost:5173) 启动

## 项目结构

```
src/
├── App.tsx                # 主应用组件
├── App.css                # 全局样式
├── types.ts               # 类型定义
├── components/            # 自定义组件
│   └── CitySearch/        # 城市搜索
|   └── WeatherCard/       # 城市天气展示卡
├── hooks/                 # 自定义hooks
│   └── useLocation/       # 城市列表
|   └── useWeather/        # 城市天气
└── main.tsx               # 应用入口
```

## 使用说明

1. 打开应用后，默认显示上海未来7天天气预报
2. 在顶部搜索框输入城市名称（如"北京"）
3. 从下拉列表中选择目标城市
4. 查看所选城市未来7天的天气预报

## 天气数据说明

- 温度单位：摄氏度(°C)
- 天气图标对应不同的天气状况
- 数据更新频率：每小时自动更新

## 常见问题

### 1. 为什么搜索不到某些城市？

目前仅支持中国主要城市查询，确保输入正确的城市中文名称。

### 2. 天气数据不更新怎么办？

检查网络连接，确保API token有效，或稍后重试。

### 3. 如何更换天气图标？

将新的SVG图标放入`public/icons`目录，文件名与API返回的iconDay字段一致。

## 贡献指南

欢迎提交Pull Request或Issue报告问题。
