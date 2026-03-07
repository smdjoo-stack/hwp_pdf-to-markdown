# 열방위에서는교회 포스모임 HTML 랜딩페이지 디자인 가이드

이 문서는 포스모임 교재를 HTML로 제작할 때 사용할 디자인 스타일과 구조를 정리한 가이드입니다. 다음 번 교재를 만들 때 이 가이드에 명시된 클래스와 마크업 구조를 참고해 주세요.

## 1. 기본 환경 (Head 설정)
- **프레임워크**: Tailwind CSS (CDN)
- **아이콘**: Lucide Icons (CDN)
- **폰트**: Google Fonts (Noto Sans KR, Noto Serif KR)
- **기본 배경색**: `bg-[#FDFCF8]` (부드러운 미색)
- **기본 글자색**: `text-slate-800`

### Tailwind 폰트 설정
```html
<script>
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['"Noto Sans KR"', 'sans-serif'],
                    serif: ['"Noto Serif KR"', 'serif'],
                }
            }
        }
    }
</script>
```

---

## 2. 주요 색상 팔레트
디자인의 일관성을 위해 다음의 Tailwind Slate/Amber 컬러 조합을 주로 사용합니다.

- **포인트 컬러 (Primary)**: `amber-600` (기본 강조), `amber-500` (아이콘, 버튼), `amber-200` (밑줄, 배경 장식), `amber-50` (매우 연한 배경)
- **텍스트 컬러 (Text)**: 
  - 제목류: `text-slate-900`
  - 본문류: `text-slate-700`, `text-slate-800`
  - 부가 설명: `text-slate-500`, `text-slate-400`
- **배경 (Background)**:
  - 본문 배경: `#FDFCF8`
  - 강조 박스 배경 (해석 에세이): `#FAF7F0`
  - 일반 박스 배경: `bg-white`

---

## 3. 웹 컨텐츠 구조 및 CSS 클래스

### 3.1. 상단 히어로부터 (Hero Section)
어두운 배경 위에 캔버스/이미지가 깔리고, 하단에 그라데이션이 적용되어 부드럽게 본문으로 이어지는 구조입니다.

```html
<header class="relative h-64 md:h-96 bg-slate-900 flex items-center justify-center overflow-hidden">
    <!-- 배경 이미지 (opacity 40%) -->
    <div class="absolute inset-0 opacity-40">
        <img src="[Unsplash 이미지 URL]" class="w-full h-full object-cover" />
    </div>
    
    <!-- 타이틀 영역 -->
    <div class="relative z-10 text-center px-4">
        <span class="inline-block px-4 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-full mb-4 tracking-wider shadow-lg">
            열방위에서는교회 포스모임
        </span>
        <h1 class="text-3xl md:text-6xl font-bold text-white mb-2 leading-tight tracking-tight break-keep">[큰 제목]</h1>
        <p class="text-amber-200 text-lg md:text-2xl font-light italic opacity-90 break-keep">"[핵심 인용구]"</p>
    </div>
    
    <!-- 하단 그라데이션 -->
    <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFCF8] to-transparent"></div>
</header>
```

### 3.2. 도입부 (Intro Section)
Lucide 아이콘을 원형으로 감싸 중앙에 배치합니다.

```html
<section class="text-center pt-10">
    <div class="inline-block p-4 bg-amber-50 rounded-full mb-6 shadow-inner">
        <i data-lucide="book-heart" class="w-10 h-10 text-amber-500"></i>
    </div>
    <h2 class="text-3xl font-bold mb-6 text-slate-900">환영합니다!</h2>
    <div class="max-w-xl mx-auto text-slate-600 leading-relaxed text-lg break-keep">
        [인사말 및 도입부 내용 (필요시 <br class="hidden md:block"/> 활용)]
    </div>
</section>
```
* **팁**: 특정 단어를 강조할 때는 `<span class="text-amber-600 font-bold underline decoration-amber-200 underline-offset-4">` 를 사용합니다.

### 3.3. 각 Step 공통 헤더
스텝이 시작될 때 사용되는 소제목 스타일입니다. (루시드 아이콘 + 대문자 태그)

```html
<div class="flex items-center space-x-2 mb-6 text-amber-600 font-bold uppercase tracking-wider text-sm">
    <i data-lucide="[관련아이콘]" class="w-5 h-5"></i>
    <span>Step 1. 마음 열기</span>
</div>
```

### 3.4. 일반 질문/본문 박스 (Step 1, Step 3)
모서리가 둥글고 옅은 그림자가 들어간 흰색 박스입니다.

```html
<div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
    <p class="text-xl font-medium text-slate-800 leading-snug text-center py-4 break-keep">
        [내용]
    </p>
</div>
```

**질문이 여러 개인 경우 구분선 적용 (Step 3 관찰질문 등):**
```html
<div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-10">
    <div class="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
        <p class="font-bold text-slate-800 text-lg leading-snug break-keep">1. [질문 내용]</p>
    </div>
    <!-- 이어서 반복 -->
</div>
```

### 3.5. 말씀 본문 영역 (Step 2)
회색의 이탤릭체로 읽기 편하게 구성하며, 절 수는 둥근 호박색(Amber) 뱃지로 디자인합니다.

```html
<div class="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 italic text-slate-700 leading-loose text-lg">
    <div class="space-y-6">
        <p>
            <span class="not-italic font-bold text-amber-600 bg-amber-50 w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm shadow-sm">1</span>
            [말씀 내용]
        </p>
    </div>
</div>
```

### 3.6. 해석 에세이 영역 (Step 4)
다른 박스들과 차별화되도록 옅은 베이지(#FAF7F0) 배경을 사용하고 오른쪽 하단에 부드럽게 흐르는 텍스트를 배치합니다.

```html
<div class="relative p-8 md:p-12 bg-[#FAF7F0] rounded-[2.5rem] border border-amber-200 shadow-inner overflow-hidden">
    <!-- 배경 따옴표 장식 -->
    <div class="absolute top-8 left-8 text-amber-200 w-24 h-24 -z-10 opacity-50">
        <i data-lucide="quote" class="w-full h-full"></i>
    </div>
    
    <h2 class="text-center text-2xl md:text-3xl font-black text-amber-900 mb-10 tracking-tight leading-tight break-keep">
        "[에세이 서브타이틀]"
    </h2>
    
    <div class="space-y-6 text-slate-700 leading-loose text-lg">
        <p class="break-keep">[본문 내용]</p>
        
        <!-- 에세이 내 강조 박스 (블록인용 스타일) -->
        <div class="font-bold text-slate-900 border-l-8 border-amber-500 pl-6 py-4 bg-white/50 rounded-r-2xl shadow-sm text-xl shadow-amber-100 break-keep">
            [가장 강조하고 싶은 메시지]
        </div>
        
        <p class="text-right italic text-slate-500 font-medium">[마무리 멘트]</p>
    </div>
</div>
```

### 3.7. 적용 질문 카드 (Step 5)
호버(hover) 시 테두리 색이 부드럽게 변하는 여러 개의 카드 리스트입니다.
순번 아이콘은 사각형(`rounded-2xl`) 스타일의 `bg-amber-500`를 사용합니다.

```html
<div class="space-y-10">
    <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:border-amber-200 transition-all">
        <div class="flex items-center mb-4">
            <span class="w-10 h-10 bg-amber-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg mr-4 shadow-lg shadow-amber-200">
                1
            </span>
            <h3 class="text-2xl font-bold text-slate-900 break-keep">[질문 주제]</h3>
        </div>
        <p class="text-slate-700 leading-relaxed text-lg break-keep">[질문 내용]</p>
    </div>
</div>
```

### 3.8. 하단 마무리 쓰기 (Footer Area)
맥박이 뛰는 듯한(pulse) 아이콘 애니메이션과 함께 결론 문장이 들어갑니다.

```html
<div class="mt-20 text-center space-y-8">
    <div class="inline-block p-4 bg-white rounded-full shadow-lg animate-pulse">
        <!-- 주제에 맞는 아이콘 (heart, anchor, flames 등) 사용 -->
        <i data-lucide="anchor" class="w-10 h-10 text-blue-500 fill-current"></i>
    </div>
    <h4 class="text-3xl font-black text-amber-700 tracking-tight leading-tight break-keep">
        "[최종 결단 문구]"
    </h4>
    <p class="text-slate-400 text-lg uppercase tracking-widest font-bold">열방위에서는교회 포스모임</p>
</div>
```

## 4. 유의사항
- 모든 텍스트 컨테이너에는 한국어 줄바꿈 보정을 위해 `break-keep` 클래스를 필수로 넣습니다.
- 모바일 가독성을 위해 `<br class="md:hidden" />` (모바일에서만 줄바꿈) 또는 `<br class="hidden md:block" />` (PC에서만 줄바꿈)를 상황에 맞게 적극 활용합니다.
- 상단 히어로(Hero) 파트의 배경 이미지는 각주의 테마와 직관적으로 연결되는 고화질(Unsplash 등) 이미지를 사용합니다.
