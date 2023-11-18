import { useContext, useEffect, useState } from "react";
import "./posted-jobs.css";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { gigs } from "../jobs-list/jobs-list";
import moment from "moment";
import toast from "react-hot-toast";
import { toastCss } from "../../App";

export const PostedJobsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [showAddJob, setShowAddJob] = useState(false);
  const [addJobTitle, setAddJobTitle] = useState("");
  const [addJobDesc, setAddJobDesc] = useState("");
  const [addJobCat, setAddJobCat] = useState("Blockchain");
  const [addJobDead, setAddJobDead] = useState<number>(0);
  const [addJobPrice, setAddJobPrice] = useState<number>(0)

  const submitJob = async () => {
    const wallet = await authContext.connectWallet();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        beneficiary: wallet,
        deadline: addJobDead,
        price: addJobPrice,
        category: addJobCat,
        title: addJobTitle,
        description: addJobDesc,
      })
    })

    const resData = await res.json();

    if(resData.msg){
      toast.error("Something went wrong posting the job", toastCss);
      return;
    }

    toast.success("Success", toastCss);
  }

  const toggleShowAddJob = () => {
    setShowAddJob((prevValue) => !prevValue);
  };

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
          <div className="new-btn-posted" onClick={() => toggleShowAddJob()}>
            <span className="material-symbols-outlined">add</span>
            <div>Add</div>
          </div>
        )}
      </div>
      {showAddJob && (
        <div className="add-job-component">
          <div className="add-job-title">Post a new job</div>
          <div className="add-job-form">
            <div className="add-job-group">
              <div className="group-label">Job title</div>
              <input
                placeholder="Smart contract audit"
                className="add-job-input"
                onChange={(e) => setAddJobTitle(e.target.value)}
              />
            </div>
            <div className="add-job-group">
              <div className="group-label">Category</div>
              <select
                className="login-input type-select"
                onChange={(e) => setAddJobCat(e.target.value)}
              >
                <option value={"Blockchain"}>Blockchain</option>
                <option value={"Machine learning"}>Machine learning</option>
                <option value={"Cybersecurity"}>Cybersecurity</option>
              </select>
            </div>

            <div className="add-job-group-flex">
              <div>
                <div className="group-label">Deadline</div>
                <input
                  placeholder="Smart contract audit"
                  className="add-job-input w-50"
                  type="date"
                  onChange={(e) => setAddJobDead(Date.parse(e.target.value).valueOf())}
                />
              </div>

              <div style={{marginLeft: "20px"}}>
                <div className="group-label">Price (ETH)</div>
                <input
                  placeholder="0.3"
                  className="add-job-input w-50"
                  type="number"
                  onChange={(e) => setAddJobPrice(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="add-job-group">
              <div className="group-label">Job description</div>
              <textarea
                placeholder="Tell us more about the job..."
                className="add-job-textarea"
                onChange={(e) => setAddJobDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="submit-job-btn" onClick={() => submitJob()}>Submit</div>
        </div>
      )}
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
