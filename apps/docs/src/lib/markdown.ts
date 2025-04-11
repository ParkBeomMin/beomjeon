import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

// 경로를 상위의 상위 디렉토리의 content로 수정
const contentDir = path.join(process.cwd(), "../../content");

// content 디렉토리가 없으면 생성
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

export async function getDocBySlug(slug: string) {
    // URL 인코딩된 슬러그를 디코딩하여 처리
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(contentDir, `${decodedSlug}.md`);
    // 파일이 존재하는지 확인
    if (!fs.existsSync(fullPath)) {
        return {
            meta: {},
            content: "",
        };
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

    const contentHtml = processedContent.toString();

    return {
        meta: data,
        content: contentHtml,
    };
}

export function getAllDocs(): { slug: string; title: string }[] {
    const walk = (
        dir: string,
        prefix = ""
    ): { slug: string; title: string }[] => {
        // 디렉토리가 존재하는지 확인
        if (!fs.existsSync(dir)) {
            return [];
        }
        
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        return entries.flatMap((entry) => {
            const entryPath = path.join(dir, entry.name);
            const slug = prefix + entry.name.replace(/\.md$/, "");

            if (entry.isDirectory()) {
                return walk(entryPath, `${slug}/`);
            }

            // .md 파일만 처리
            if (!entry.name.endsWith('.md')) {
                return [];
            }

            const fileContents = fs.readFileSync(entryPath, "utf8");
            const { data } = matter(fileContents);
            return [{ slug, title: data.title || slug }];
        });
    };

    return walk(contentDir);
}

export function getAllDocsDetailed(): {
    slug: string;
    title: string;
    tags: string[];
    content: string;
}[] {
    // DocDetailed 타입 정의
    type DocDetailed = {
        slug: string;
        title: string;
        tags: string[];
        content: string;
    };
    
    const walk = (dir: string, prefix = ""): DocDetailed[] => {
        // 디렉토리가 존재하는지 확인
        if (!fs.existsSync(dir)) {
            return [];
        }
        
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        return entries.flatMap((entry) => {
            const entryPath = path.join(dir, entry.name);
            const slug = prefix + entry.name.replace(/\.md$/, "");

            if (entry.isDirectory()) {
                return walk(entryPath, `${slug}/`);
            }

            // .md 파일만 처리
            if (!entry.name.endsWith('.md')) {
                return [];
            }

            const fileContents = fs.readFileSync(entryPath, "utf8");
            const { data, content } = matter(fileContents);
            return [
                {
                    slug,
                    title: data.title ?? "",
                    tags: data.tags ?? [],
                    content: content,
                },
            ];
        });
    };

    return walk(contentDir);
}

export function getDocsByTag(tag: string) {
    const allDocs = getAllDocsDetailed();
    return allDocs.filter((doc) => doc.tags?.includes(tag));
}

export function getAllTags(): string[] {
    const allDocs = getAllDocsDetailed();
    const tagSet = new Set<string>();
    allDocs.forEach((doc) => {
        doc.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
}
