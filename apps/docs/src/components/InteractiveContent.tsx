'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        [key: string]: any;
    }
}

export default function InteractiveContent({ content }: { content: string }) {
    useEffect(() => {
        // content에서 script 태그를 찾아 실행
        const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
        const scripts = content.match(scriptRegex);
        
        if (scripts) {
            scripts.forEach(script => {
                const code = script.replace(/<script>|<\/script>/g, '');
                try {
                    // document.body.innerHTML += script;
                    // 스크립트 실행
                    eval(code);
                    eval('const a = 1;console.log(a);');
                } catch (e) {
                    console.error('스크립트 실행 오류:', e);
                }
            });
        }
    }, [content]);
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
} 