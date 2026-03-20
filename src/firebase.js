// src/firebase.js — Firebase Firestore (real-time shared edits)

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyDxCPz1cvIZZxUHwo-ZhTyf3VA1sQU2Ggc",
  authDomain:        "content-plan-56567.firebaseapp.com",
  projectId:         "content-plan-56567",
  storageBucket:     "content-plan-56567.firebasestorage.app",
  messagingSenderId: "169064044421",
  appId:             "1:169064044421:web:354d60f02f44ceee5716ec",
  measurementId:     "G-E4YND67SC1"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const DOC_REF = () => doc(db, 'mantiq_edits', 'all');

// ── Load all edits once on boot ───────────────────────────
export async function loadAllEdits() {
  try {
    const snap = await getDoc(DOC_REF());
    return snap.exists() ? snap.data() : {};
  } catch (e) {
    console.warn('Firebase load failed:', e.message);
    return {};
  }
}

// ── Save one post edit (merges, won't overwrite others) ───
export async function saveEdit(postId, data) {
  try {
    await setDoc(DOC_REF(), { [postId]: data }, { merge: true });
    return true;
  } catch (e) {
    console.warn('Firebase save failed:', e.message);
    return false;
  }
}

// ── Real-time listener — updates all open tabs instantly ──
export function listenForEdits(callback) {
  return onSnapshot(DOC_REF(), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}
