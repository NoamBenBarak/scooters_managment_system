import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Application from './application';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

  root.render(
    <BrowserRouter> 
      <AuthProvider>
        <Application/>
      </AuthProvider>
    </BrowserRouter> 
  );

reportWebVitals();
