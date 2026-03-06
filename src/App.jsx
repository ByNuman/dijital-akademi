import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Certificates from './pages/Certificates';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';

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
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
          <Route path="/course/:id" element={<PageWrapper><CourseDetail /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="/certificates" element={<PageWrapper><Certificates /></PageWrapper>} />
          <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
          <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        </Route>

        {/* Course Player Layout'suz/Özel Layout ile olacak (Sidebar için) */}
        <Route path="/learn/:id" element={<PageWrapper><CoursePlayer /></PageWrapper>} />
      </Routes>
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
