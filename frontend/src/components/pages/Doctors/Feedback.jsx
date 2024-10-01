import React, { useState } from 'react';
import avatar from '../../../assets/images/avatar-icon.png';
import { formatDate } from '../../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';

const Feedback = ({ reviews = [], totalRating, onNewReview }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const toggleFeedbackForm = () => {
    setShowFeedbackForm((prev) => !prev);
  };

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="flex justify-between gap-[10px] mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img src={review.user?.photo || avatar} alt={`${review.user?.name || 'User'} avatar`} className="w-full" />
                </figure>
                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">{formatDate(review?.createdAt)}</p>
                  <p className="text_para mt-3 font-medium text-[15px]">{review?.reviewText}</p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {!showFeedbackForm ? (
        <div className="text-center">
          <button className="btn" onClick={toggleFeedbackForm}>
            Give Feedback
          </button>
        </div>
      ) : (
        <FeedbackForm onNewReview={onNewReview} />
      )}
    </div>
  );
};

export default Feedback;
