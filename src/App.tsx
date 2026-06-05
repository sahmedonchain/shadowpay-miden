import { AppProviders } from "./providers";
import { ShadowPayApp } from "./components/ShadowPayApp";

export default function App() {
  return (
    <AppProviders>
      <ShadowPayApp />
    </AppProviders>
  );
}