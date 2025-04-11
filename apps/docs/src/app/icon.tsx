import { ImageResponse } from 'next/og';

// 아이콘 크기 설정
export const size = {
  width: 32,
  height: 32,
};

// 이미지 응답 형식 설정
export const contentType = 'image/png';

// 범전 로고를 SVG로 생성하는 함수
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom right, #3b82f6, #1e40af)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        <span style={{ fontWeight: 900 }}>범</span>
      </div>
    ),
    {
      ...size,
    }
  );
} 