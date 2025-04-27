import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/libs/features/store";
import { Provider as ThemeProvider } from '@ant-design/react-native'
// 语言包
import enUS from '@ant-design/react-native/lib/locale-provider/en_US'
import esES from '@ant-design/react-native/lib/locale-provider/es_ES'
import faIR from '@ant-design/react-native/lib/locale-provider/fa_IR'
import koKR from '@ant-design/react-native/lib/locale-provider/ko_KR'
import ptBR from '@ant-design/react-native/lib/locale-provider/pt_BR'
import ruRU from '@ant-design/react-native/lib/locale-provider/ru_RU'
import svSE from '@ant-design/react-native/lib/locale-provider/sv_SE'
import zhCN from '@ant-design/react-native/lib/locale-provider/zh_CN'



export default function Providered({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState('中国');

  const languages: Array<any> = [
    {
      value: '中国',
      label: '中国',
      language: zhCN,
    },
    {
      value: 'English',
      label: 'English',
      language: enUS,
    },
    {
      value: 'Русский',
      label: 'Русский',
      language: ruRU,
    },
    {
      value: 'Español',
      label: 'Español',
      language: esES,
    },
    {
      value: 'Português - BR',
      label: 'Português - BR',
      language: ptBR,
    },
    {
      value: 'Sverige',
      label: 'Sverige',
      language: svSE,
    },
    {
      value: 'Persian',
      label: 'Persian',
      language: faIR,
    },
    {
      value: '한국',
      label: '한국',
      language: koKR,
    },
  ]
  const currentLocale = languages.find(
    (item) => item.value === locale,
  ).language;

  return (
    <Provider store={store}>
      <ThemeProvider locale={currentLocale}>
        {children}
      </ThemeProvider>
    </Provider>
  );
}