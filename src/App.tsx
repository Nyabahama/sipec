import HomeView from './HomeView';
import { LanguageProvider } from './lib/language';
import { AdminApp } from './pages/admin/AdminApp';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

function App() {
  if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) {
    return <AdminApp />;
  }

  return (
    <LanguageProvider>
      <HomeView />
      <PwaInstallPrompt />
    </LanguageProvider>
  );
}

export default App;
