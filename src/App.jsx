import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Yükleme Animasyonu
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#101010]">
    <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"></div>
  </div>
);

// Sayfa geçiş animasyonu ayarları
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } }
};

// Animasyon sarmalayıcı bileşeni
const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
            <Route path="/course/:id" element={<PageWrapper><CourseDetail /></PageWrapper>} />
            <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

            {/* Protected Routes inside MainLayout */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            </Route>
          </Route>

          {/* Course Player Layout'suz/Özel Layout ile olacak (Sidebar için) - Sadece giriş yapanlara */}
          <Route element={<PrivateRoute />}>
            <Route path="/learn/:id" element={<PageWrapper><CoursePlayer /></PageWrapper>} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="bottom-right" />
    </Router>
  )
}

export default App;
