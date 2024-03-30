import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";
import { SingleJob } from "./types";

export default function JobItemContent({
  singleJob,
  isLoading,
}: {
  singleJob: SingleJob | null;
  isLoading: boolean;
}) {
  if(isLoading) return <Spinner/>
  if (!singleJob) return <EmptyJobContent />;
  
  return (
    <>
  
    <section className="job-details">
      <div>
        <img
          src={singleJob?.coverImgURL}
          alt="#"
        />

        <a className="apply-btn" href={singleJob?.companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{singleJob?.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{singleJob?.daysAgo}d</time>

              <BookmarkIcon id={singleJob.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{singleJob?.title}</h2>
            <p className="job-info__company">{singleJob?.company}</p>
            <p className="job-info__description">{singleJob?.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {singleJob?.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {singleJob?.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {singleJob?.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {singleJob?.qualifications.map((q) => (
                <li key={q} className="qualifications__item">
                  {q}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {singleJob?.reviews.map((q) => (
                <li key={q} className="reviews__item">
                  {q}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </section>
    </>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
