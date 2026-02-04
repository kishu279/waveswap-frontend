"use client";

export function HistoryTab() {
    return (
        <div className="space-y-4">
            <p className="text-3xl leading-relaxed font-light" style={{ color: "var(--color-text-secondary)" }}>
                your receipts
            </p>
            <p className="text-3xl leading-relaxed font-light" style={{ color: "var(--color-text-muted)" }}>
                no hiding now
            </p>
            <p className="text-xl mt-8" style={{ color: "var(--color-text-muted)" }}>
                📜 Every trade, every send, every "oops I pressed the wrong button" - it's all here. The blockchain never forgets, and neither do we.
            </p>
        </div>
    );
}
