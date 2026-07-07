import type { Article } from "@/lib/api";

interface Props {
  article?: Article;
  type?: "website" | "article";
}

const BASE_URL = "https://aitoolshub.com";
const SITE_NAME = "AIToolsHub";

export default function StructuredData({ article, type = "website" }: Props) {
  let data: object;

  if (type === "article" && article) {
    data = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.meta_description || article.excerpt,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
      },
      datePublished: article.published_at,
      dateModified: article.updated_at,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/articles/${article.slug}`,
      },
      url: `${BASE_URL}/articles/${article.slug}`,
      articleSection: article.category,
      wordCount: article.content.split(/\s+/).length,
      timeRequired: `PT${article.reading_time}M`,
    };
  } else {
    data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
      description:
        "Honest reviews, practical guides, and the latest news on AI tools.",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Honest, human-written reviews of AI tools. No hype — real experience from daily users.",
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      {type === "website" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
        />
      )}
    </>
  );
}

// BreadcrumbList for category/article pages
export function BreadcrumbLD({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
