import { useContext, useEffect } from "react";
import "./posted-jobs.css";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { gigs } from "../jobs-list/jobs-list";
import moment from "moment";

export const PostedJobsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="posted-jobs-wrap">
      <div className="posted-jobs-top">
        <h1 className="posted-top-title">
          {authContext.type === "CLIENT" ? (
            <div>Posted jobs</div>
          ) : (
            <div>My jobs</div>
          )}
        </h1>
        {authContext.type === "CLIENT" && (
          <div className="new-btn-posted">
            <span className="material-symbols-outlined">add</span>
            <div>Add</div>
          </div>
        )}
      </div>
      <div className="posted-jobs-list">
        {gigs.map((gig, idx) => (
          <div className="job-card" key={idx}>
            <div className="card-top">
              <div className="job-title">{gig.title}</div>
              {gig.active ? (
                <div className="apply-btn">Active</div>
              ) : (
                <div className="inactive-btn">Inactive</div>
              )}
            </div>
            <div className="job-description">{gig.description}</div>
            <div className="tags-list">
              <div className="job-tag">{gig.category}</div>
              <div className="job-tag">
                {moment(gig.deadline).format("dddd, MMMM Do, YYYY h:mm A")}
              </div>
              <div className="job-tag">
                <div className="d-flex">
                  <span className="material-symbols-outlined">
                    new_releases
                  </span>
                  <div style={{ marginLeft: "10px" }}>Funds staked</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
