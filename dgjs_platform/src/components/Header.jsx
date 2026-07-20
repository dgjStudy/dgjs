import React from "react";
import { UserCircle2, LogOut, Database } from "lucide-react";

export default function Header({ active = "dashboard" }) {
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
