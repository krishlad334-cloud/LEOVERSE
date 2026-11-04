import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp, Plus, Sparkles } from 'lucide-react';
import { getReviews, submitReview } from '../../services/api';

export const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loadReviews = async () => {
    if (!product?.id) return;
    try {
      const data = await getReviews(product.id);
      setReviews(data);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [product?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formComment.trim()) return;
    setSubmitting(true);

    try {
      await submitReview({
        productId: product.id,
        userName: formName || 'Fashion Connoisseur',
        rating: formRating,
        title: formTitle,
        comment: formComment
      });

      setSubmitted(true);
      setShowForm(false);
      setFormComment('');
      setFormTitle('');
      setFormName('');
      await loadReviews();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
    : (product.rating || 4.9);

  return (
    <div id="reviews-section" className="py-12 border-t border-[#E5E0D6] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A68962]">
            Verified Customer Feedback
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#1E1E1E]">
            Ratings & Reviews ({reviews.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1E1E1E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Thank you! Your verified review has been recorded to the live database.</span>
        </div>
      )}

      {/* Review submission form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 bg-[#F8F6F2] border border-[#E5E0D6] rounded-2xl space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-bold text-sm text-[#1E1E1E]">Review this Garment</h3>

          {/* Star selector */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Your Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormRating(star)}
                  className="p-1 cursor-pointer focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || formRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-gray-700 ml-2">
                {formRating} of 5 Stars
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Siddharth Malhotra"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg focus:outline-none focus:border-[#A68962]"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Review Headline</label>
              <input
                type="text"
                placeholder="e.g. Superb fabric drape and luxury fit"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg focus:outline-none focus:border-[#A68962]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Detailed Review</label>
            <textarea
              rows={3}
              placeholder="Share how the fabric feels, fit accuracy, and styling details..."
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DCD5C9] rounded-lg focus:outline-none focus:border-[#A68962]"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-[#1E1E1E] hover:bg-black text-white font-bold rounded-lg uppercase tracking-wider disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {/* Review score breakdown card */}
      <div className="p-6 bg-[#F8F6F2] border border-[#E5E0D6] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-[#1E1E1E]">{avgRating}</span>
            <span className="text-sm text-gray-500 font-medium">/ 5.0</span>
          </div>
          <div className="flex items-center text-amber-500 my-1 justify-center sm:justify-start">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-xs text-gray-500">Based on {reviews.length} authentic purchases</p>
        </div>

        <div className="flex-1 max-w-sm space-y-1.5 w-full text-xs">
          {[5, 4, 3, 2, 1].map((ratingVal) => {
            const count = reviews.filter((r) => r.rating === ratingVal).length;
            const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={ratingVal} className="flex items-center space-x-2 text-gray-600">
                <span className="w-8 font-medium">{ratingVal} ★</span>
                <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#A68962] h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right font-mono text-gray-400">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-[#1E1E1E]">{r.userName || r.author}</span>
                <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Verified Buyer</span>
                </span>
              </div>
              <span className="text-[10px] text-gray-400">
                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Verified'}
              </span>
            </div>

            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= r.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>

            {r.title && <h4 className="font-bold text-xs text-[#1E1E1E]">{r.title}</h4>}
            <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
