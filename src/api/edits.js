// api/edits.js — Vercel Serverless Function
// Saves and loads post edits using Vercel KV (Redis)
// Setup: vercel.com → Storage → Create KV Database → link to project

import { kv } from '@vercel/kv';

const KV_KEY = 'mantiq_edits';

export default async function handler(req, res) {
  // Allow cross-origin (same domain only in production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET — load all saved edits
    if (req.method === 'GET') {
      const edits = await kv.get(KV_KEY);
      return res.status(200).json({ edits: edits || {} });
    }

    // POST — save one post edit
    if (req.method === 'POST') {
      const { id, data } = req.body;

      if (!id || !data) {
        return res.status(400).json({ error: 'Missing id or data' });
      }

      // Load existing edits
      const edits = (await kv.get(KV_KEY)) || {};

      // Merge this post's edits
      edits[id] = data;

      // Save back
      await kv.set(KV_KEY, edits);

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error('KV error:', err);
    // Fallback — don't crash, just return empty
    if (req.method === 'GET') {
      return res.status(200).json({ edits: {} });
    }
    return res.status(500).json({ error: 'Storage error' });
  }
}
