import React, { useState, useMemo } from "react";
import {
    Search,
    LogOut,
    UserCircle2,
    ArrowLeft,
    Pencil,
    Database,
    Building2,
    ChevronRight,
} from "lucide-react";

import "./index.css";

/* -------------------------------------------------------------
   더미 데이터 (IT / 공공기관 성격의 데이터 카탈로그 5건)
------------------------------------------------------------- */
const dummyData = [
    {
        id: 1,
        name: "국민연금 가입자 통계 데이터",
        type: "통계",
        source: "국민연금공단 DB",
        owner: "김민준",
        createdAt: "2023-03-14",
        updatedAt: "2024-11-02",
        description:
            "전국 국민연금 가입자 수, 신규 가입, 탈퇴 현황을 지역·연령·직군별로 집계한 통계 데이터입니다. 매월 1회 배치 작업을 통해 갱신되며, 정책 수립 및 지역별 가입률 분석에 활용됩니다.",
        schema: [
            { column: "region_cd", type: "VARCHAR(10)", desc: "행정구역 코드" },
            { column: "age_group", type: "VARCHAR(10)", desc: "연령대 구간 (예: 20-29)" },
            { column: "subscriber_cnt", type: "INTEGER", desc: "가입자 수" },
            { column: "new_join_cnt", type: "INTEGER", desc: "신규 가입자 수" },
            { column: "withdraw_cnt", type: "INTEGER", desc: "탈퇴자 수" },
            { column: "stat_month", type: "DATE", desc: "통계 기준 월" },
        ],
    },
    {
        id: 2,
        name: "전국 대중교통 실시간 운행 데이터",
        type: "실시간",
        source: "국가교통정보센터 API",
        owner: "이서연",
        createdAt: "2022-07-01",
        updatedAt: "2024-06-20",
        description:
            "전국 버스 및 지하철의 실시간 위치, 지연 정보, 혼잡도를 수집한 실시간 스트리밍 데이터입니다. 5초 간격으로 갱신되며, 교통 혼잡 예측 모델의 입력 데이터로 사용됩니다.",
        schema: [
            { column: "vehicle_id", type: "VARCHAR(20)", desc: "차량 고유 식별자" },
            { column: "route_no", type: "VARCHAR(10)", desc: "노선 번호" },
            { column: "lat", type: "DECIMAL(9,6)", desc: "위도" },
            { column: "lng", type: "DECIMAL(9,6)", desc: "경도" },
            { column: "congestion_lv", type: "SMALLINT", desc: "혼잡도 레벨 (1~5)" },
            { column: "collected_at", type: "TIMESTAMP", desc: "데이터 수집 시각" },
        ],
    },
    {
        id: 3,
        name: "지방자치단체 예산 집행 현황",
        type: "재무",
        source: "e나라도움 연계",
        owner: "박지훈",
        createdAt: "2023-01-10",
        updatedAt: "2024-09-15",
        description:
            "전국 지자체별 세출 예산 편성 및 집행률을 부서·사업 단위로 정리한 재무 데이터입니다. 분기별로 갱신되며, 예산 집행률 모니터링 대시보드의 기반 데이터로 사용됩니다.",
        schema: [
            { column: "local_gov_cd", type: "VARCHAR(10)", desc: "지자체 코드" },
            { column: "dept_name", type: "VARCHAR(50)", desc: "담당 부서명" },
            { column: "budget_amt", type: "BIGINT", desc: "편성 예산액 (원)" },
            { column: "executed_amt", type: "BIGINT", desc: "집행 금액 (원)" },
            { column: "exec_rate", type: "DECIMAL(5,2)", desc: "집행률 (%)" },
            { column: "quarter", type: "VARCHAR(6)", desc: "기준 분기 (예: 2024Q3)" },
        ],
    },
    {
        id: 4,
        name: "공공 와이파이 이용자 로그",
        type: "로그",
        source: "통신3사 제공",
        owner: "최유진",
        createdAt: "2021-11-23",
        updatedAt: "2024-03-30",
        description:
            "전국 공공 와이파이 접속 지점(AP)의 이용자 접속·해제 로그입니다. 개인 식별 정보는 비식별화 처리되어 있으며, 유동 인구 분석 및 AP 증설 우선순위 산정에 활용됩니다.",
        schema: [
            { column: "ap_id", type: "VARCHAR(20)", desc: "AP(접속 지점) 식별자" },
            { column: "session_id", type: "VARCHAR(32)", desc: "세션 고유 식별자 (비식별)" },
            { column: "connect_ts", type: "TIMESTAMP", desc: "접속 시각" },
            { column: "disconnect_ts", type: "TIMESTAMP", desc: "해제 시각" },
            { column: "data_usage_mb", type: "DECIMAL(10,2)", desc: "사용 데이터량 (MB)" },
        ],
    },
    {
        id: 5,
        name: "스마트팜 환경 센서 데이터",
        type: "센서",
        source: "IoT 게이트웨이",
        owner: "정하늘",
        createdAt: "2024-02-05",
        updatedAt: "2024-12-01",
        description:
            "전국 스마트팜 시범 농가에 설치된 IoT 센서로부터 수집한 온도, 습도, 토양 수분, CO2 농도 데이터입니다. 1분 간격으로 수집되며, 작물 생육 예측 모델 학습에 사용됩니다.",
        schema: [
            { column: "farm_id", type: "VARCHAR(15)", desc: "농가 고유 식별자" },
            { column: "sensor_type", type: "VARCHAR(20)", desc: "센서 종류 (온도/습도/토양/CO2)" },
            { column: "value", type: "DECIMAL(8,2)", desc: "측정값" },
            { column: "unit", type: "VARCHAR(10)", desc: "측정 단위 (℃, %, ppm 등)" },
            { column: "measured_at", type: "TIMESTAMP", desc: "측정 시각" },
        ],
    },
];

/* -------------------------------------------------------------
   공통 레이아웃: Header / Footer
------------------------------------------------------------- */
function Header({ active = "dashboard" }) {
    const navItems = [
        { key: "dashboard", label: "데이터 카탈로그" },
        { key: "favorites", label: "즐겨찾기 데이터" },
        { key: "request", label: "데이터 등록 요청" },
        { key: "guide", label: "이용 안내" },
    ];
    const subItems = ["전체 데이터목록", "부서별 데이터", "최근 조회 데이터", "변경 이력"];

    return (
        <header className="w-full">
            {/* 상단 유틸리티 바 */}
            <div className="w-full bg-[#0a1b33]">
                <div className="mx-auto max-w-6xl px-6 h-9 flex items-center justify-between">
                    <span className="text-[11.5px] text-slate-400">
                        DGJS 임직원 전용 사내 데이터 포털입니다
                    </span>
                    <div className="flex items-center gap-4 text-[11.5px] text-slate-300">
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                            <UserCircle2 size={13} strokeWidth={1.8} />
                            마이 페이지
                        </button>
                        <span className="w-px h-3 bg-white/15" />
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                            <LogOut size={12.5} strokeWidth={1.8} />
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>

            {/* 메인 내비게이션 */}
            <div className="w-full bg-[#12294d]">
                <div className="mx-auto max-w-6xl px-6 h-[70px] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center ring-1 ring-white/15">
                            <Database size={18} className="text-white" strokeWidth={2} />
                        </div>
                        <div className="leading-tight">
                            <p className="text-[17px] font-bold text-white tracking-tight">
                                DGJS<span className="font-normal text-slate-300"> 데이터 플랫폼</span>
                            </p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-9">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                className={
                                    "relative text-[14.5px] py-6 transition-colors " +
                                    (item.key === active
                                        ? "text-white font-semibold"
                                        : "text-slate-300 hover:text-white font-medium")
                                }
                            >
                                {item.label}
                                {item.key === active && (
                                    <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-white rounded-full" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 서브 내비게이션 */}
            <div className="w-full bg-[#0d213e] border-b border-black/20">
                <div className="mx-auto max-w-6xl px-6 h-11 flex items-center gap-7">
                    {subItems.map((label, idx) => (
                        <button
                            key={label}
                            className={
                                "text-[13px] transition-colors " +
                                (idx === 0
                                    ? "text-white font-semibold"
                                    : "text-slate-400 hover:text-slate-200")
                            }
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="w-full border-t border-slate-200 bg-white mt-auto">
            <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-400">
                    <Building2 size={15} strokeWidth={1.8} />
                    <span className="text-xs">
                        (주)DGJS &nbsp;|&nbsp; 서울특별시 강남구 테헤란로 123 &nbsp;|&nbsp; 대표: 정다은
                    </span>
                </div>
                <span className="text-xs text-slate-400">
                    © 2024 DGJS Inc. All rights reserved.
                </span>
            </div>
        </footer>
    );
}

/* -------------------------------------------------------------
   화면 1: 메인 데이터 대시보드
------------------------------------------------------------- */
function DashboardView({ data, onSelect }) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.type.toLowerCase().includes(q) ||
                d.owner.toLowerCase().includes(q)
        );
    }, [data, query]);

    return (
        <div className="mx-auto max-w-6xl px-6 py-10 w-full">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                <span>홈</span>
                <ChevronRight size={12} />
                <span>데이터 카탈로그</span>
                <ChevronRight size={12} />
                <span className="text-slate-600 font-medium">전체 데이터목록</span>
            </div>
            <div className="mb-7">
                <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">
                    데이터 카탈로그
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    사내에 등록된 전체 데이터셋을 조회하고 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-600">
                    전체 데이터 수:{" "}
                    <span className="font-semibold text-[#12294d]">{data.length}개</span>
                </span>
                <div className="relative w-72">
                    <Search
                        size={16}
                        strokeWidth={2}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="제목 / 유형 / 등록자 검색"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-[#12294d]/20 focus:border-[#12294d] transition-shadow"
                    />
                </div>
            </div>

            <div className="border-t border-slate-200">
                {filtered.map((row) => (
                    <button
                        key={row.id}
                        onClick={() => onSelect(row.id)}
                        className="w-full text-left flex items-start justify-between gap-6 px-1 py-5 border-b border-slate-200 hover:bg-slate-50 transition-colors group"
                    >
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono text-slate-400">
                                    No.{String(row.id).padStart(2, "0")}
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#12294d] text-white">
                                    {row.type}
                                </span>
                            </div>
                            <h3 className="text-[15.5px] font-semibold text-slate-900 group-hover:text-[#12294d] transition-colors mb-2 truncate">
                                {row.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
                                <span>{row.source}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>등록자 {row.owner}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>등록일 {row.createdAt}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>최종 수정 {row.updatedAt}</span>
                            </div>
                        </div>
                        <ChevronRight
                            size={18}
                            className="mt-1.5 flex-shrink-0 text-slate-300 group-hover:text-[#12294d] group-hover:translate-x-0.5 transition-all"
                        />
                    </button>
                ))}
                {filtered.length === 0 && (
                    <div className="px-1 py-14 text-center text-slate-400 text-sm">
                        검색 결과가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------
   화면 2: 데이터 상세 페이지
------------------------------------------------------------- */
function DetailView({ item, onBack }) {
    return (
        <div className="mx-auto max-w-6xl px-6 py-10 w-full">
            <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#12294d] mb-6 transition-colors"
            >
                <ArrowLeft size={16} strokeWidth={2} />
                목록으로
            </button>

            <div className="border border-slate-200 rounded-lg p-7 mb-6">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#12294d]/[0.07] text-[#12294d] mb-2.5">
                            {item.type}
                        </span>
                        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                            {item.name}
                        </h1>
                    </div>
                    <span className="text-sm text-slate-400">#{item.id}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <p className="text-xs text-slate-400 mb-1">데이터 원천</p>
                        <p className="text-sm text-slate-700 font-medium">{item.source}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-1">등록자</p>
                        <p className="text-sm text-slate-700 font-medium">{item.owner}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-1">등록일</p>
                        <p className="text-sm text-slate-700 font-medium">{item.createdAt}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-1">최종 수정일</p>
                        <p className="text-sm text-slate-700 font-medium">{item.updatedAt}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-slate-400 mb-1.5">데이터 설명</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-sm font-semibold text-slate-800">스키마 정의</h2>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-[#12294d] border border-[#12294d]/25 rounded-md px-2.5 py-1.5 hover:bg-[#12294d]/[0.06] transition-colors">
                        <Pencil size={13} strokeWidth={2} />
                        수정
                    </button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-500">
                            <th className="text-left font-medium px-6 py-2.5 w-56">컬럼명</th>
                            <th className="text-left font-medium px-6 py-2.5 w-40">타입</th>
                            <th className="text-left font-medium px-6 py-2.5">설명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.schema.map((col, idx) => (
                            <tr
                                key={idx}
                                className="border-b border-slate-100 last:border-0"
                            >
                                <td className="px-6 py-3 font-mono text-[13px] text-slate-700">
                                    {col.column}
                                </td>
                                <td className="px-6 py-3 text-slate-500 font-mono text-[13px]">
                                    {col.type}
                                </td>
                                <td className="px-6 py-3 text-slate-600">{col.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------
   최상위 App
------------------------------------------------------------- */
export default function App() {
    const [view, setView] = useState("list"); // 'list' | 'detail'
    const [selectedId, setSelectedId] = useState(null);

    const selectedItem = useMemo(
        () => dummyData.find((d) => d.id === selectedId) || null,
        [selectedId]
    );

    const handleSelect = (id) => {
        setSelectedId(id);
        setView("detail");
    };

    const handleBack = () => {
        setView("list");
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-1 w-full">
                {view === "list" && (
                    <DashboardView data={dummyData} onSelect={handleSelect} />
                )}
                {view === "detail" && selectedItem && (
                    <DetailView item={selectedItem} onBack={handleBack} />
                )}
            </main>
            <Footer />
        </div>
    );
}
