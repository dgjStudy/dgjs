import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, Plus, Trash2, Save, Database } from "lucide-react";

const DATA_TYPES = [
    { value: "VARCHAR(255)", label: "VARCHAR(255) - 문자열" },
    { value: "TEXT", label: "TEXT - 긴 문자열" },
    { value: "INT", label: "INT - 정수" },
    { value: "BIGINT", label: "BIGINT - 큰 정수" },
    { value: "BOOLEAN", label: "BOOLEAN - 논리값" },
    { value: "DATE", label: "DATE - 날짜" },
    { value: "TIMESTAMP", label: "TIMESTAMP - 일시" }
];

export default function CreateTableView() {
    const navigate = useNavigate();
    const [tableName, setTableName] = useState("");
    const [columns, setColumns] = useState([{ name: "", type: "VARCHAR(255)" }]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleAddColumn = () => {
        setColumns([...columns, { name: "", type: "VARCHAR(255)" }]);
    };

    const handleRemoveColumn = (index) => {
        if (columns.length === 1) return;
        const newColumns = columns.filter((_, i) => i !== index);
        setColumns(newColumns);
    };

    const handleColumnChange = (index, field, value) => {
        const newColumns = [...columns];
        newColumns[index][field] = value;
        setColumns(newColumns);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!tableName.trim()) {
            setMessage({ type: "error", text: "테이블 이름을 입력해주세요." });
            return;
        }

        const isValidColumns = columns.every(col => col.name.trim());
        if (!isValidColumns) {
            setMessage({ type: "error", text: "모든 컬럼의 이름을 입력해주세요." });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/tables", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tableName: tableName.trim(),
                    columns: columns.map(col => ({
                        name: col.name.trim(),
                        type: col.type
                    }))
                }),
            });

            if (response.ok) {
                setMessage({ type: "success", text: "테이블이 성공적으로 생성되었습니다!" });
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                const errText = await response.text();
                setMessage({ type: "error", text: `생성 실패: ${errText}` });
            }
        } catch (error) {
            setMessage({ type: "error", text: "서버와 통신할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-6 py-10 w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
                <button onClick={() => navigate("/")} className="hover:text-slate-600 hover:underline">
                    홈
                </button>
                <ChevronRight size={12} />
                <span className="text-slate-600 font-medium">테이블 생성</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate("/")}
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">
                            새 데이터 테이블 생성
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500 mt-2 ml-10">
                        물리적 데이터베이스에 새로운 테이블을 동적으로 생성합니다.
                    </p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-md mb-6 flex items-start gap-3 ${
                    message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                    <Database size={20} className={message.type === "success" ? "text-emerald-500" : "text-red-500"} />
                    <div className="text-sm font-medium pt-0.5">{message.text}</div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                        테이블 이름 (Table Name)
                    </label>
                    <input
                        type="text"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        placeholder="예: user_events, product_catalog"
                        className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#12294d]/20 focus:border-[#12294d] transition-shadow"
                    />
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        영문 소문자, 숫자, 언더바(_)만 사용 가능합니다.
                    </p>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-slate-800">
                            컬럼 설정 (Columns)
                        </label>
                        <button
                            type="button"
                            onClick={handleAddColumn}
                            className="flex items-center gap-1.5 text-sm text-[#12294d] hover:text-[#1a3869] font-medium px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                        >
                            <Plus size={16} />
                            컬럼 추가
                        </button>
                    </div>

                    <div className="space-y-3">
                        {/* Header */}
                        <div className="flex gap-3 px-4 py-2 bg-slate-50 rounded-md text-xs font-medium text-slate-500">
                            <div className="flex-1">컬럼명 (Column Name)</div>
                            <div className="w-48">데이터 타입 (Data Type)</div>
                            <div className="w-10"></div>
                        </div>

                        {columns.map((col, index) => (
                            <div key={index} className="flex gap-3 items-center group">
                                <input
                                    type="text"
                                    value={col.name}
                                    onChange={(e) => handleColumnChange(index, "name", e.target.value)}
                                    placeholder="예: user_id, email"
                                    className="flex-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#12294d]/20 focus:border-[#12294d] transition-shadow"
                                />
                                <select
                                    value={col.type}
                                    onChange={(e) => handleColumnChange(index, "type", e.target.value)}
                                    className="w-48 px-4 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#12294d]/20 focus:border-[#12294d] transition-shadow bg-white cursor-pointer"
                                >
                                    {DATA_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveColumn(index)}
                                    disabled={columns.length === 1}
                                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#12294d] rounded-lg hover:bg-[#1a3869] transition-colors disabled:opacity-70 shadow-sm"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        테이블 생성
                    </button>
                </div>
            </form>
        </div>
    );
}
