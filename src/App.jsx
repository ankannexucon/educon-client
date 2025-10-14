import { AuthProvider } from "./contexts/authContext";
import Index from "./routes/Index";

export default function App() {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
}
