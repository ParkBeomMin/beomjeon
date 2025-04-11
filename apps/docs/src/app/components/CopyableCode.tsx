"use client";

import { useEffect } from "react";

export default function CopyableCode() {
    useEffect(() => {
        const blocks = document.querySelectorAll("pre");

        blocks.forEach((block) => {
            // 이미 복사 버튼이 있으면 중복 방지
            if (block.querySelector(".copy-btn")) return;

            const button = document.createElement("button");
            button.innerText = "📋 복사";
            button.className =
                "copy-btn absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700";

            button.onclick = async () => {
                const code = block.querySelector("code");
                if (!code) return;

                try {
                    await navigator.clipboard.writeText(code.innerText);
                    button.innerText = "✅ 복사됨!";
                    setTimeout(() => (button.innerText = "📋 복사"), 1500);
                } catch (_) {
                    button.innerText = "❌ 실패";
                }
            };

            block.classList.add("relative", "rounded");
            block.appendChild(button);
        });
    }, []);

    return null; // 아무것도 렌더링하지 않음
}
