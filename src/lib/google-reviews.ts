// Google Business Profile reviews via the Places API (v1). Shared by the
// /api/reviews route (the homepage carousel, client-side) and ReviewsStrip
// (server-rendered on the city, service and industry pages, so the review text
// is in the initial HTML).
//
// Server-only: reads GOOGLE_PLACES_API_KEY. Both callers hit the same URL with
// the same headers and a one-day revalidate, so Next's data cache serves them
// from one Places call a day.

export interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  photoUri?: string;
}

export interface GoogleReviewsData {
  displayName: string;
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

export type GoogleReviewsResult =
  | { ok: true; data: GoogleReviewsData }
  | { ok: false; status: number };

interface GooglePlaceReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: { text: string; languageCode: string };
  originalText: { text: string; languageCode: string };
  authorAttribution: { displayName: string; uri: string; photoUri?: string };
  publishTime: string;
}

// Places API v1 returns `rating` and `userRatingCount` as sibling top-level
// fields — exactly as requested in the X-Goog-FieldMask below.
interface GooglePlaceResponse {
  name: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
  displayName?: { text: string; languageCode: string };
}

// Without credentials (local dev, previews) the UI renders without reviews.
const EMPTY: GoogleReviewsData = { displayName: 'Zenara Designs', rating: 5, userRatingCount: 0, reviews: [] };

export async function fetchGoogleReviews(): Promise<GoogleReviewsResult> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return { ok: true, data: EMPTY };

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,displayName',
      },
      // Reviews change rarely; a daily refresh keeps Places API usage (billed
      // per call) far inside the free tier.
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.error('Google Places API error:', response.status, await response.text());
      return { ok: false, status: response.status };
    }

    const data: GooglePlaceResponse = await response.json();

    const reviews = (data.reviews || [])
      .sort((a, b) => {
        const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return timeB - timeA;
      })
      .slice(0, 5)
      .map((review) => ({
        name: review.authorAttribution?.displayName || 'Anonymous',
        rating: review.rating || 5,
        text: review.text?.text || review.originalText?.text || '',
        relativeTime: review.relativePublishTimeDescription || 'Recently',
        publishTime: review.publishTime || new Date().toISOString(),
        photoUri: review.authorAttribution?.photoUri,
      }));

    return {
      ok: true,
      data: {
        displayName: data.displayName?.text || data.name || '',
        rating: data.rating ?? 0,
        userRatingCount: data.userRatingCount ?? 0,
        reviews,
      },
    };
  } catch (err) {
    console.error('Error fetching Google Reviews:', err);
    return { ok: false, status: 500 };
  }
}
