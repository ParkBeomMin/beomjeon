import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const contentDir = path.join(process.cwd(), "content");

export async function getDocBySlug(slug: string) {
    const fullPath = path.join(contentDir, `${slug}.md`);
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
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        return entries.flatMap((entry) => {
            const entryPath = path.join(dir, entry.name);
            const slug = prefix + entry.name.replace(/\.md$/, "");

            if (entry.isDirectory()) {
                return walk(entryPath, `${slug}/`);
            }

            const fileContents = fs.readFileSync(entryPath, "utf8");
            const { data } = matter(fileContents);
            return [{ slug, title: data.title }];
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
    const walk = (dir: string, prefix = ""): any[] => {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        return entries.flatMap((entry) => {
            const entryPath = path.join(dir, entry.name);
            const slug = prefix + entry.name.replace(/\.md$/, "");

            if (entry.isDirectory()) {
                return walk(entryPath, `${slug}/`);
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
