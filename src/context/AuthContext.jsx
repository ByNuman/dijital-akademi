import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user & create profile in Firestore
  async function registerUser(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update auth profile
    await updateProfile(user, { displayName: name });
    
    // Create Firestore document
    const userDocRef = doc(db, "users", user.uid);
    const newUserData = {
      uid: user.uid,
      name: name,
      email: email,
      xp: 0,
      level: 1,
      enrolledCourses: [],
      role: "user",
      createdAt: new Date().toISOString()
    };
    
    await setDoc(userDocRef, newUserData);
    setUserData(newUserData);
    return user;
  }

  // Login
  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logoutUser() {
    return signOut(auth);
  }

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user data from firestore
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // Eğer Auth var fakat Firestore'da doküman yoksa, fallback:
            setUserData({ name: user.displayName || "Kullanıcı", uid: user.uid, role: "user" });
          }
        } catch (error) {
          console.error("Kullanıcı verisi alınırken hata:", error);
          setUserData({ name: user.displayName || "Kullanıcı", uid: user.uid, role: "user" });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    registerUser,
    loginUser,
    logoutUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
