"use client";

import Image from "next/image";

export default function LeftSidebar({
                                        STEPS,
                                        currentStepIndex,
                                        setCurrentStepIndex
                                    }) {
    return (
        <aside
            className="w-[260px] h-screen flex flex-col bg-[#f3f7f7] border-r overflow-hidden"
            style={{ minWidth: 260 }}
        >
            {/* Logo Section */}
            <div className="p-6 pb-2">
                <div className="w-200 h-12 rounded flex items-center justify-center shadow-sm">
                    <Image
                        src={"/assets/sahoolat.png"}
                        width={200}
                        height={36}
                        alt="Sahoolat"
                    />
                </div>
                <div className="text-xs text-gray-500 mt-3">Seller Onboarding</div>
            </div>

            {/* Scrollable Menu */}
            <nav className="flex-1 overflow-auto px-4 pb-6">
                {STEPS.map((s, i) => {
                    const active = i === currentStepIndex;
                    const done = i < currentStepIndex;

                    return (
                        <button
                            key={s.key}
                            onClick={() => setCurrentStepIndex(i)}
                            className={`w-full flex items-center gap-4 p-2 rounded-lg transition ${
                                active ? "bg-white shadow-sm" : "hover:bg-white/50"
                            }`}
                        >
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center border ${
                                    active ? "bg-[#e6f7f7]" : "bg-white"
                                }`}
                            >
                                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                                    <Image
                                        src={s.icon}
                                        width={26}
                                        height={26}
                                        alt="icon"
                                    />
                                </div>
                            </div>

                            <div className="text-left">
                                <div
                                    className={`text-sm font-semibold ${
                                        active ? "text-black" : "text-gray-700"
                                    }`}
                                >
                                    {s.label}
                                </div>

                                <div className="text-xs text-gray-400">
                                    {done ? "Completed" : active ? "In Progress" : "Pending"}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Progress Footer */}
            <div className="p-6 border-t">
                <div className="text-xs text-gray-400 mb-2">Progress</div>

                <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                        className="h-3 bg-[#008080]"
                        style={{
                            width: `${
                                Math.round(((currentStepIndex + 1) / STEPS.length) * 100)
                            }%`,
                        }}
                    />
                </div>
            </div>
        </aside>
    );
}
