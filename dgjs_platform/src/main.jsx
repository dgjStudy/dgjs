import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { dummyData } from "./data";

export default function DashboardView() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return dummyData;
        return dummyData.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.type.toLowerCase().includes(q) ||
                d.owner.toLowerCase().includes(q)
        );
    }, [query]);

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
                    <span className="font-semibold text-[#12294d]">{dummyData.length}개</span>
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
                        onClick={() => navigate(`/detail/${row.id}`)}
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
