import { initializeApp } from 'firebase/app';
import { 
  initializeFirestore,
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  limit,
  setLogLevel
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyD3B2FY4pMLIZUSntXSPXvBwRpDdMwn3Q8",
  authDomain: "noted-pen-r40ks.firebaseapp.com",
  projectId: "noted-pen-r40ks",
  storageBucket: "noted-pen-r40ks.firebasestorage.app",
  messagingSenderId: "705548023822",
  appId: "1:705548023822:web:109571ccf2bc75efd9245f"
};

// Set log level to silent to suppress benign stream-disconnect and idle-timeout logs
setLogLevel('silent');

const app = initializeApp(firebaseConfig);

// Initialize Firestore with forced long-polling to prevent WebSocket/gRPC idle disconnects in sandboxed environments
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, "ai-studio-vinamakhana-f381cb8a-20f2-42ca-b118-d5d0f0f3e663");
const auth = getAuth(app);

export { 
  db, 
  auth, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  limit
};
