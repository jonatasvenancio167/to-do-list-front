import { AuthProvider } from './Hooks/useAuth';
import { ToastProvider } from './Hooks/useToast';
import './index.css'
import { AppRoutes } from './Routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes/>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
