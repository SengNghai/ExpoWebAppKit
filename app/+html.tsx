import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// 这个文件仅适用于 Web 端，配置 HTML 根元素
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, user-scalable=no, maximum-scale=1"
        />

        {/* 禁用双指放大 */}
        <style>
          {`
            html, body {
              touch-action: manipulation; /* 限制缩放和双指手势 */
              -webkit-user-select: none; /* 禁用文本选中 */
              user-select: none;
            }
          `}
        </style>

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <script dangerouslySetInnerHTML={{ __html: sw }} />

        {/* 禁用 Web 端 body 滚动，使 ScrollView 更接近原生 */}
        <ScrollViewStyleReset />

      </head>
      <body>{children}</body>
    </html>
  );
}

// Service Worker 注册
const sw = `
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
`;
