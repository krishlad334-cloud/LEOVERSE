import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Vikram S.',
    verified: true,
    rating: 5,
    date: '3 days ago',
    title: 'Superb fabric drape and precision stitching',
    comment: 'The weight of the fabric is exceptional. Cut feels tailored without being restrictive. Will definitely be picking up more colors.',
    helpful: 12,
  },
  {
    id: 2,
    author: 'Aman K.',
    verified: true,
    rating: 5,
    date: '1 week ago',
    title: 'Understated luxury in every detail',
    comment: 'Exactly the minimalist aesthetic I was looking for. No loud logos, just pure quality cloth and immaculate proportions.',
    helpful: 8,
  },
  {
    id: 3,
    author: 'Rohan M.',
    verified: true,
    rating: 4,
    date: '2 weeks ago',
    title: 'Great fit, fits true to standard sizing',
    comment: 'Chest and shoulders align perfectly with the size chart. Fabric is breathable for all-day wear.',
    helpful: 5,
  },
];

export const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState(() => {
    const key = `leoverse_reviews_${product.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const key = `leoverse_reviews_${product.id}`;
    localStorage.setItem(key, JSON.stringify(reviews));
  }, [reviews, product.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: formName.trim(),
      verified: true,
      rating: formRating,
      date: 'Just now',
      title: formTitle.trim() || 'Verified Purchase Review',
      comment: formComment.trim(),
      helpful: 0,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setFormName('');
    setFormTitle('');
    setFormComment('');
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 2000);
  };

  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews-section" className="py-12 border-t border-[#D8D2C8] mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#D8D2C8]">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#77746E]">
            Client Experiences
          </span>
          <h2 className="text-2xl font-serif text-[#242321] mt-1">
            Ratings & Editorial Reviews
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-light text-[#242321]">{avgRating}</span>
            <div className="space-y-1">
              <div className="flex items-center text-amber-600">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(avgRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-[#D8D2C8]'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#77746E]">
                Based on {reviews.length} verified reviews
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-[#242321] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#383733] transition-colors cursor-pointer"
          >
            {showForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="my-8 p-6 bg-[#EAE5DC]/30 border border-[#D8D2C8] space-y-4 max-w-2xl"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#242321]">
            Share Your Experience with {product.name}
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77746E] mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormRating(s)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      s <= (hoverRating || formRating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-[#D8D2C8]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#77746E] mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Siddharth R."
                className="w-full bg-[#F7F5F0] border border-[#D8D2C8] px-3 py-2 text-xs focus:outline-none focus:border-[#242321]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#77746E] mb-1.5">
                Review Headline
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Exceptional fit and fabric"
                className="w-full bg-[#F7F5F0] border border-[#D8D2C8] px-3 py-2 text-xs focus:outline-none focus:border-[#242321]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#77746E] mb-1.5">
              Detailed Feedback *
            </label>
            <textarea
              required
              rows={3}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              placeholder="Tell us about the drape, comfort, fit, and styling..."
              className="w-full bg-[#F7F5F0] border border-[#D8D2C8] px-3 py-2 text-xs focus:outline-none focus:border-[#242321]"
            />
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-2.5 border border-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Thank you! Your verified client review has been published.</span>
            </div>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#242321] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#383733] transition-colors cursor-pointer"
            >
              Publish Review
            </button>
          )}
        </form>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-[#D8D2C8] pt-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="py-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-600">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= rev.rating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-[#D8D2C8]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#242321]">
                  {rev.author}
                </span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#77746E]">{rev.date}</span>
            </div>

            {rev.title && (
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#242321]">
                {rev.title}
              </h4>
            )}

            <p className="text-xs text-[#77746E] leading-relaxed max-w-3xl">
              {rev.comment}
            </p>

            <div className="pt-1 flex items-center gap-4 text-[11px] text-[#77746E]">
              <span className="flex items-center gap-1 cursor-pointer hover:text-[#242321]">
                <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpful})
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
