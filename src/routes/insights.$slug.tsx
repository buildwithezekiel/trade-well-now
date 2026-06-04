import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";
import { posts } from "./insights";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => {
    const p = posts.find(x => x.slug === params.slug);
    return { meta: [{ title: `${p?.title ?? "Post"} — iTrade Insights` }, { name: "description", content: p?.excerpt ?? "" }] };
  },
  component: Post,
  notFoundComponent: () => <PageShell title="Post not found"><p className="text-muted-foreground">That article doesn't exist. <Link to="/insights" className="text-brand hover:underline">Back to insights</Link>.</p></PageShell>,
  loader: ({ params }) => {
    const post = posts.find(p => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell eyebrow={post.tag} title={post.title} lede={post.excerpt}>
      <p className="text-xs text-muted-foreground">{post.date} · {post.read} read</p>
      <Section title="Premise">
        <p>This is a mock long-form note that demonstrates the article template. In production each post is authored in MDX and rendered with the same typography system.</p>
        <p>The iTrade research team publishes operational write-ups roughly twice a month — usually post-mortems, infrastructure changes, or a deep dive on something we changed in a recent EA release.</p>
      </Section>
      <Section title="Detail">
        <p>We instrumented every order from 01 Jan to 30 Apr across 1,284 live accounts. The dataset isolates orders that crossed a high-impact news window by ±15 minutes versus a control group outside that window.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mean slippage outside blackout: <strong>0.42 pips</strong></li>
          <li>Mean slippage inside ±15m window: <strong>3.18 pips</strong></li>
          <li>P95 slippage inside window: <strong>11.4 pips</strong></li>
          <li>Stop-out frequency uplift inside window: <strong>4.2×</strong></li>
        </ul>
      </Section>
      <Section title="What we shipped">
        <p>Effective in EA build 4.1.7, the default <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground">NewsBlackoutMin</code> value moved from 8 to 15. Users can still override per-account in the risk panel.</p>
      </Section>
      <p className="pt-4"><Link to="/insights" className="text-brand hover:underline">← All insights</Link></p>
    </PageShell>
  );
}
