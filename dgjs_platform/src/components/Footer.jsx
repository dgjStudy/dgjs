import React from "react";
import { Building2 } from "lucide-react";

export default function Footer() {
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
