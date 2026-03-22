import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/ui/PageTransition";
import { Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import ScrollToTop from './components/ui/ScrollToTop';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));
const CoursePlayer = React.lazy(() => import('./pages/CoursePlayer'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));

const About = React.lazy(() => import('./pages/About'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Info Pages
const InfoPages = await import('./pages/info/InfoPages');
const { 
  NasilKullanilir, 
  KVKK, 
  SSS, 
  GizlilikPolitikasi, 
  CerezPolitikasi, 
  KullanimSartlari 
} = InfoPages;

// Yükleme Animasyonu
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#101010]">
    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
              <Route path="/course" element={<Navigate to="/courses" replace />} />
              <Route path="/course/:id" element={<PageTransition><CourseDetail /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />

              <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

              {/* Info Pages */}
              <Route path="/nasil-kullanilir" element={<PageTransition><NasilKullanilir /></PageTransition>} />
              <Route path="/kvkk" element={<PageTransition><KVKK /></PageTransition>} />
              <Route path="/sss" element={<PageTransition><SSS /></PageTransition>} />
              <Route path="/gizlilik-politikasi" element={<PageTransition><GizlilikPolitikasi /></PageTransition>} />
              <Route path="/cerez-politikasi" element={<PageTransition><CerezPolitikasi /></PageTransition>} />
              <Route path="/kullanim-sartlari" element={<PageTransition><KullanimSartlari /></PageTransition>} />

              {/* Protected Routes inside MainLayout */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
              </Route>
            </Route>

            {/* Course Player Layout'suz/Özel Layout ile olacak (Sidebar için) - Sadece giriş yapanlara */}
            <Route element={<PrivateRoute />}>
              <Route path="/learn/:id" element={<CoursePlayer />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  )
}

export default App;
