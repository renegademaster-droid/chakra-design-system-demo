import { DocLayout } from "./pages/DocLayout";
import { ComponentPages } from "./pages/ComponentPages";

export default function App() {
  return (
    <DocLayout
      renderPage={(pageId) => <ComponentPages pageId={pageId} />}
    />
  );
}
