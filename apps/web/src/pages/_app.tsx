import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@/styles/globals.css';

// PKU Theme customization
const pkuTheme = {
  token: {
    colorPrimary: '#94070a',
    colorLink: '#94070a',
    colorLinkHover: '#b91c1c',
    borderRadius: 4,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji'`,
  },
  components: {
    Button: {
      borderRadius: 4,
    },
    Select: {
      borderRadius: 4,
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN} theme={pkuTheme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
