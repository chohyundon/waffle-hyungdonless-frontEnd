import type { Metadata } from 'next';
import '@/app/globals.css';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: '사부작사부작',
  description:
    '사회초년생을 위한 유용한 정보와 지원을 제공하는 커뮤니티 사이트입니다. 주거, 금융, 자기계발, 복지 등 다양한 분야의 팁과 자료를 통해 더 나은 시작을 돕습니다',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
