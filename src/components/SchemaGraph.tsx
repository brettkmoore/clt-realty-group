import { graph, type SchemaNode } from '@/lib/schema'

export function SchemaGraph({ nodes }: { nodes: SchemaNode[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(nodes)) }} />
}
