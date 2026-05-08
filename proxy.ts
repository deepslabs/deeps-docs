import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute } from '@/lib/shared';

const { rewrite: rewriteSuffix } = rewritePath('{/*path}.mdx', `${docsContentRoute}{/*path}/content.md`);

const ignoredPrefixes = ['/api', '/_next', '/og', '/llms.mdx'];
const ignoredPaths = ['/favicon.ico', '/llms.txt', '/llms-full.txt'];

function isIgnoredPath(pathname: string): boolean {
  if (ignoredPaths.includes(pathname)) return true;
  if (ignoredPrefixes.some((prefix) => pathname.startsWith(prefix))) return true;
  return /\.[^/]+$/.test(pathname);
}

function mapDocsPathToMarkdown(pathname: string): string {
  const normalized = pathname === '/' ? '' : pathname;
  return `${docsContentRoute}${normalized}/content.md`;
}

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    const target = pathname === '/docs' ? '/' : pathname.replace('/docs', '');
    return NextResponse.redirect(new URL(target, request.nextUrl), 308);
  }

  const result = rewriteSuffix(pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    return NextResponse.rewrite(new URL(mapDocsPathToMarkdown(pathname), request.nextUrl));
  }

  return NextResponse.next();
}
