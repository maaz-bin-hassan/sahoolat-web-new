export default function RightPanel({
                                       currentStepIndex,
                                       STEPS,
                                       userSend,
                                       selectedPayment,
                                       setBankDetails,
                                       bankDetails,
                                       setCurrentStepIndex
                                   }) {

    const step = STEPS[currentStepIndex].key;

    return (
        <aside className="w-[360px] bg-[#EFFEFF] border-l flex flex-col overflow-hidden">

            {/* Header Card */}
            <div className="p-6 pb-0">
                <div className="rounded-xl p-4 bg-white shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold">
                                {STEPS[currentStepIndex].label}
                            </div>

                            <div className="text-xs text-gray-500">
                                {step === "services" && "Select your service categories."}
                                {step === "bank" && "Enter your bank / payment information."}
                                {step === "profile" && "Upload your profile photo."}
                                {step === "cnicFront" && "Upload the front of your CNIC."}
                                {step === "cnicBack" && "Upload the back of your CNIC."}
                                {step === "review" && "Review your details before submitting."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-auto p-6">

                {/* SERVICES STEP */}
                {step === "services" && (
                    <div className="rounded-xl p-4 bg-white/90 border shadow-sm">
                        <div className="text-sm font-medium mb-2">Quick service picks</div>
                        <div className="flex flex-wrap gap-2">
                            {["Cleaning", "Tutoring", "Delivery", "Handyman"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => userSend(s)}
                                    className="px-3 py-2 bg-[#f6fafa] border rounded-lg text-sm"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* BANK STEP */}
                {step === "bank" && (
                    <div className="rounded-xl p-4 bg-white/90 border shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Selected Payment</div>
                        <div className="text-sm font-medium mb-3">
                            {selectedPayment || "—"}
                        </div>

                        <label className="block text-xs text-gray-500">Account / IBAN</label>
                        <input
                            value={bankDetails.accountNumber}
                            onChange={(e) =>
                                setBankDetails((v) => ({ ...v, accountNumber: e.target.value }))
                            }
                            className="w-full px-3 py-2 border rounded-md mb-2"
                        />

                        <label className="block text-xs text-gray-500">Account Holder</label>
                        <input
                            value={bankDetails.holderName}
                            onChange={(e) =>
                                setBankDetails((v) => ({ ...v, holderName: e.target.value }))
                            }
                            className="w-full px-3 py-2 border rounded-md"
                        />

                        <button
                            onClick={() => setCurrentStepIndex(2)}
                            className="mt-3 w-full bg-[#007f7a] text-white py-2 rounded-lg"
                        >
                            Save & Continue
                        </button>
                    </div>
                )}

                {/* Additional steps (profile, CNIC, review) go here */}
            </div>
        </aside>
    );
}
