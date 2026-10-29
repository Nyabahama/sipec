import HomeView from './HomeView';
import { LanguageProvider } from './lib/language';
import { AdminApp } from './pages/admin/AdminApp';

function App() {
  if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')) {
    return <AdminApp />;
  }

  return (
    <LanguageProvider>
      <HomeView />
    </LanguageProvider>
  );
}

export default App;
