import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { db } from '../utils/adminInit';

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  category: z.enum(['product', 'account', 'billing', 'partnership', 'bug']),
  message: z.string().trim().min(10).max(2000),
});

export const submitContactInquiry = onCall(
  { region: 'us-central1', maxInstances: 5 },
  async (request) => {
    const parsed = ContactSchema.safeParse(request.data);
    if (!parsed.success) {
      throw new HttpsError('invalid-argument', 'Check the name, email, category, and message.');
    }

    const email = parsed.data.email.toLowerCase();
    const hour = Math.floor(Date.now() / 3_600_000);
    const rateId = `${email.replace(/[^a-z0-9]/g, '_')}_${hour}`;
    const rateRef = db.collection('contact_rate').doc(rateId);

    const allowed = await db.runTransaction(async (tx) => {
      const snap = await tx.get(rateRef);
      const count = snap.exists ? Number(snap.get('count') ?? 0) : 0;
      if (count >= 5) return false;
      tx.set(rateRef, { count: count + 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      return true;
    });

    if (!allowed) {
      throw new HttpsError('resource-exhausted', 'Too many messages from this address. Try again later.');
    }

    await db.collection('contact_inquiries').add({
      ...parsed.data,
      email,
      uid: request.auth?.uid ?? null,
      createdAt: FieldValue.serverTimestamp(),
    });

    logger.info('contact inquiry stored', { category: parsed.data.category });
    return { ok: true };
  },
);

/** Checkout stays closed until Stripe test keys and price IDs are configured. */
export const createCheckoutSession = onCall(
  { region: 'us-central1', maxInstances: 5 },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in before checkout.');
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new HttpsError('failed-precondition', 'Stripe is not configured. No charge was created.');
    }
    throw new HttpsError('failed-precondition', 'Stripe price IDs are not approved. No charge was created.');
  },
);
