import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, STATIC_PHONE_DATA } from '../constants';
import { AppType } from '../types';

// Safely access process.env to prevent crash in environments where process is undefined
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not defined
  }
  return undefined;
};

const apiKey = getApiKey();

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// Helper to shuffle array and pick n items
const getRandomItems = (array: string[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const fetchPhoneContent = async (appType: AppType): Promise<string[]> => {
  // Always use static data as base, and try to enhance with AI if available
  const staticItems = STATIC_PHONE_DATA[appType] || [];
  const requiredCount = appType === 'search' ? 20 : 6;
  
  if (!ai) {
    // If no AI, just return random static items
    return getRandomItems(staticItems, requiredCount);
  }

  try {
    let promptInstruction = "";

    switch (appType) {
      case 'search':
        promptInstruction = `
          [요청]
          42세 조폭 부두목 '곽용철'의 스마트폰 인터넷 검색 기록을 **20개** 생성하세요.
          
          [상황]
          그는 짝사랑하는 상대(사용자)에게 잘 보이고 싶지만, 연애 경험이 없고 옛날 사람이라 엉뚱한 검색을 합니다.
          강한 겉모습과 달리 귀엽고 소심한 검색어여야 합니다.
          
          [예시]
          - 여자들이 좋아하는 이모티콘 추천
          - 강남 조용한 파스타 맛집 (주차장 넓은 곳)
          - 카톡 읽씹 1시간 의미
          - 20대 선물 추천 10만원대
          - 심장이 너무 빨리 뛰는데 병원 가야하나요
          - (이런 식으로 20개 이상 작성)
          
          [출력 형식]
          오직 검색어 20줄만 출력하세요. 번호나 부가 설명 금지.
        `;
        break;
      case 'message':
        promptInstruction = `
          [요청]
          곽용철이 사용자에게 보내려다가 부끄러워서 보내지 못한 '임시 저장 메시지' 4개를 생성하세요.
          
          [상황]
          썼다 지웠다 하며 고민한 흔적이 역력해야 합니다.
          투박하지만 진심이 담긴 내용, 오타, 혹은 너무 아재 같은 멘트.
          
          [예시]
          - 자니...? 아 이건 좀 아닌가
          - 오늘 날씨가 참 좋네. 너 처럼. (전송 취소됨)
          - 밥은 먹었냐. 굶고 다니지 마라.
          - 주말에 혹시 시간 되면... 아니다.
          
          [출력 형식]
          메시지 내용 4줄만 출력하세요.
        `;
        break;
      case 'memo':
        promptInstruction = `
          [요청]
          곽용철의 '메모장'에 적힌 비밀 메모 4개를 생성하세요.
          
          [상황]
          자신이 잊어버릴까 봐 적어둔 연애 팁, 뽀삐(반려견) 육아 일기, 혹은 조직 관련 소소한 할 일들.
          
          [예시]
          - 뽀삐 간식 줄 때 '손' 훈련 시키기 (자꾸 으르렁거림)
          - MZ세대 유행어: 어쩔티비(쓰지 말것), 킹받네
          - 박성민한테 이번 달 영수증 처리 맡기기
          - 그녀가 좋아하는 커피: 아이스 아메리카노 (샷 추가)
          
          [출력 형식]
          메모 내용 4줄만 출력하세요.
        `;
        break;
      case 'bank':
        promptInstruction = `
          [요청]
          곽용철의 '토스/뱅크앱' 입출금 내역 5개를 생성하세요.
          
          [상황]
          조폭다운 큰 지출과, 반전 매력이 있는 소소하고 귀여운 지출이 섞여 있어야 합니다.
          
          [예시]
          - [출금] 핑크색 강아지 목줄 (쿠팡): -15,000원
          - [입금] 수금(강남지부): +5,000,000원
          - [출금] 넷플릭스 (로맨스영화): -17,000원
          - [출금] 꽃배달 (익명): -100,000원
          
          [출력 형식]
          내역 5줄만 출력하세요.
        `;
        break;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'user', parts: [{ text: promptInstruction }] }
      ],
      config: {
        temperature: 0.9,
        maxOutputTokens: 1000, 
      },
    });

    const text = response.text || "";
    let aiItems = text.split('\n').filter(line => line.trim().length > 0).map(line => line.replace(/^- /, '').trim());
    
    // Fallback if AI returns empty or fails to generate enough items
    if (aiItems.length === 0) {
        return getRandomItems(staticItems, requiredCount);
    }

    return aiItems;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Graceful degradation: return static funny items
    return getRandomItems(staticItems, requiredCount);
  }
};