# Pigeon_website

参考 [QQ 即时通讯官网](https://im.qq.com/index/#/) 布局与交互的演示落地页（原创品牌 **Pigeon**，非官方仿站）。

## 本地运行

```bash
cd pigeon-im-site
npm install
npm run dev
```

浏览器打开终端提示的本地地址（默认 `http://localhost:5173`）。

## 功能概览

- 全屏背景视频（与 [Pigeon Nest](https://coocoo8192.wixsite.com/my-site-3) 官网同源）
- 固定顶栏：产品下载 / 账号服务下拉菜单
- 居中主标语「轻松做自己」与平台下载按钮
- 顶部菜单对齐 [PigeonNest 官网](https://coocoo8192.wixsite.com/my-site-3)：Home、Features、Privacy Policy、Terms of Service、About Us、Contact、Delete Account
- 底部平台切换：iOS、Mac（与 iOS 同 App Store 地址）、APK、Google Play、Windows
- 根据当前系统自动预选下载平台

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS v4
