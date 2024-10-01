import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import HashLoader from 'react-spinners/HashLoader';
import { useParams } from 'react-router-dom';
import { BASE_URL, token } from '../../../config';
import { toast } from 'react-toastify';

const FeedbackForm = ({ onNewReview }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Rating and Review Fields are required");
      }
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rating, reviewText })
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success(result.message);
      onNewReview(result.data); // Add the new review to the reviews list
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleStarClick = (clickedIndex) => {
    setRating(clickedIndex);
  };

  const handleStarHover = (hoveredIndex) => {
    setHover(hoveredIndex);
  };

  const handleStarLeave = () => {
    setHover(0);
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">How would you rate the overall experience?</h3>
        <div>
          {[...Array(5).keys()].map((index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                type="button"
                className={`${starValue <= (hover || rating) ? 'text-yellowColor' : 'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleStarHover(starValue)}
                onMouseLeave={handleStarLeave}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">Share your feedback or suggestions</h3>
        <textarea className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md" rows="5" placeholder='Write your message' onChange={(e) => setReviewText(e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn">
        {loading ? <HashLoader color="white" size={20} /> : 'Submit Feedback'}
      </button>
    </form>
  );
}

export default FeedbackForm;
