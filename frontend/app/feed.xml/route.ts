import { getArticles } from "@/lib/api";
import type { Article } from "@/lib/api";

const BASE_URL = "https://aitoolshub.com";

export const dynamic = "force-dynamic";

export async function GET() {
  let articles: Article[] = [];
  try {
    const data = await getArticles(1, 50);
    articles = data.articles;
  } catch {
    articles = [];
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AIToolsHub — Honest AI Tool Reviews</title>
    <link>${BASE_URL}</link>
    <description>Real reviews from real users on ChatGPT, Claude, Midjourney, Cursor, and every AI tool that matters.</description>
    <language>en-us</language>
    <managingEditor>hello@aitoolshub.com (AIToolsHub Editorial)</managingEditor>
    <webMaster>hello@aitoolshub.com (AIToolsHub)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.svg</url>
      <title>AIToolsHub</title>
      <link>${BASE_URL}</link>
    </image>${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/articles/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/articles/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <content:encoded><![CDATA[${article.content.slice(0, 2000)}...]]></content:encoded>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <category><![CDATA[${article.category}]]></category>
      <author>hello@aitoolshub.com (${article.author})</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
