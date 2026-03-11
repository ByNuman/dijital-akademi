import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));
const CoursePlayer = React.lazy(() => import('./pages/CoursePlayer'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const Community = React.lazy(() => import('./pages/Community'));
const Blog = React.lazy(() => import('./pages/Blog'));
const About = React.lazy(() => import('./pages/About'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Info Pages
const { 
  NasilKullanilir, 
  KVKK, 
  SSS, 
  GizlilikPolitikasi, 
  CerezPolitikasi, 
  KullanimSartlari 
} = await import('./pages/info/InfoPages');

// Yükleme Animasyonu
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#101010]">
    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Info Pages */}
            <Route path="/nasil-kullanilir" element={<NasilKullanilir />} />
            <Route path="/kvkk" element={<KVKK />} />
            <Route path="/sss" element={<SSS />} />
            <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
            <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
            <Route path="/kullanim-sartlari" element={<KullanimSartlari />} />

            {/* Protected Routes inside MainLayout */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Course Player Layout'suz/Özel Layout ile olacak (Sidebar için) - Sadece giriş yapanlara */}
          <Route element={<PrivateRoute />}>
            <Route path="/learn/:id" element={<CoursePlayer />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" />
    </Router>
  )
}

export default App;
