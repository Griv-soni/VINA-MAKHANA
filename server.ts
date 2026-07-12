import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { PRODUCTS } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Firebase Configuration from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyD3B2FY4pMLIZUSntXSPXvBwRpDdMwn3Q8",
  authDomain: "noted-pen-r40ks.firebaseapp.com",
  projectId: "noted-pen-r40ks",
  storageBucket: "noted-pen-r40ks.firebasestorage.app",
  messagingSenderId: "705548023822",
  appId: "1:705548023822:web:109571ccf2bc75efd9245f"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, "ai-studio-vinamakhana-f381cb8a-20f2-42ca-b118-d5d0f0f3e663");

// Let's store orders in Firestore
// AI Studio Custom Direct Order Processing via wa.me

// --- API ROUTES ---

// Products Endpoints
app.get('/api/products', async (req, res) => {
  try {
    const productsColl = collection(db, 'products');
    const qSnapshot = await getDocs(productsColl);
    let productsList = qSnapshot.docs.map(d => d.data());

    if (productsList.length === 0) {
      console.log('No products found in Firestore. Seeding with default PRODUCTS...');
      for (const p of PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
      const reSnapshot = await getDocs(productsColl);
      productsList = reSnapshot.docs.map(d => d.data());
    }

    res.json(productsList);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.id || !productData.name) {
      return res.status(400).json({ error: 'Missing product ID or Name' });
    }
    await setDoc(doc(db, 'products', productData.id), productData);
    res.status(201).json(productData);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to add product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    await setDoc(doc(db, 'products', productId), productData);
    res.json({ success: true, product: productData });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteDoc(doc(db, 'products', productId));
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete product' });
  }
});

// Orders Endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const ordersQuery = query(collection(db, 'orders'));
    const querySnapshot = await getDocs(ordersQuery);
    const ordersList = querySnapshot.docs.map(d => d.data());
    // Sort descending
    ordersList.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(ordersList);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', req.params.id));
    if (orderDoc.exists()) {
      res.json(orderDoc.data());
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch order' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { customerDetails, items, totalAmount } = req.body;
  if (!customerDetails || !customerDetails.name || !customerDetails.phone) {
    return res.status(400).json({ error: 'Missing customer name or phone number' });
  }

  // Generate continuous unique order ID formatted like VM-YYYYMMDD-001
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}${month}${day}`;

  let orderSequenceNumber = 1;
  try {
    const ordersQuery = query(collection(db, 'orders'));
    const querySnapshot = await getDocs(ordersQuery);
    const prefix = `VM-${dateString}-`;
    const todayOrders = querySnapshot.docs.filter(d => d.id.startsWith(prefix));
    orderSequenceNumber = todayOrders.length + 1;
  } catch (e) {
    orderSequenceNumber = Math.floor(Math.random() * 90) + 10;
  }
  const orderId = `VM-${dateString}-${String(orderSequenceNumber).padStart(3, '0')}`;

  const newOrder = {
    id: orderId,
    customerDetails,
    items,
    totalAmount,
    status: 'received',
    createdAt: new Date().toISOString()
  };

  try {
    // Write to Firestore
    await setDoc(doc(db, 'orders', orderId), newOrder);

    res.status(201).json(newOrder);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create order' });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  if (!['received', 'confirmed', 'dispatched', 'delivered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid order status value' });
  }

  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Perform updates
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });

    res.json({ success: true, status });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update status' });
  }
});

app.post('/api/orders/:id/review', async (req, res) => {
  const orderId = req.params.id;
  const { rating, comment } = req.body;

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
  }

  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();
    const customer = orderData.customerDetails;

    const review = {
      rating,
      comment: comment || '',
      createdAt: new Date().toISOString()
    };

    // Save review to the order
    await updateDoc(doc(db, 'orders', orderId), {
      review
    });

    // Save review globally so it can be seen on the home page or feedback widgets!
    const globalReviewDoc = doc(collection(db, 'reviews'), orderId);
    await setDoc(globalReviewDoc, {
      orderId,
      customerName: customer.name,
      rating,
      comment,
      createdAt: review.createdAt
    });

    res.json({ success: true, review });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit review' });
  }
});

// --- VITE DEV SERVER OR STATIC DISPATCH SETUP ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Serve public assets explicitly in development mode to prevent image loading failures
    app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback: Serve public assets directly from public/assets if not found in dist
    app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
