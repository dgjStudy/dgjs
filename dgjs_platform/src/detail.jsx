import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { dummyData } from "./data";

export default function DetailView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const item = dummyData.find((d) => d.id === parseInt(id));

    if (!item) {
        return (
            <div className="mx-auto max-w-6xl px-6 py-10 w-full text-center text-slate-500">
                해당 데이터를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-10 w-full">
            <button
                onClick={() => navigate(-1)}
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
