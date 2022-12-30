import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes/Route/Route';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-slate-900">
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
