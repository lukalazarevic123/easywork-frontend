import { useEffect, useState } from "react";
import ethicon from "../../assets/eth.png";
import { useParams } from "react-router-dom";
import "./job-view.css";
import moment from "moment";

// const job = {
//   beneficiary: "0x4E598B1c93C62aF988214455ae6A1f517cE854c1",
//   freelancer: "0x4E598B1c93C62aF988214455ae6A1f517cE854c1",
//   deadline: 1700277752329,
//   price: 10 ** 18,
//   active: false,
//   category: "Machine learning",
//   title:
//     "Full-Stack Adventure Awaits: Laravel, Inertia, PostgreSQL Magician Needed",
//   description:
//     "We are seeking a a highly skilled and experienced Laravel and Inertia.js Expert to join our dynamic team. In this role, you will be responsible for developing, maintaining, and optimizing web applications using Laravel and Inertia.js. Your primary focus will be on back-end development, but proficiency in react technologies is a plus.",
// };

const comments = [
  {
    id: "12efeqr2432e123ufeu645",
    content: "This is my comment and I have nothing much to say really.",
    vote: "LIKE",
    title: "Title to my comment",
  },
  {
    id: "12efeqr2432e123ufeu645",
    content: "This is my comment and I have nothing much to say really.",
    vote: "DISLIKE",
    title: "Title to my comment",
  },
  {
    id: "12efeqr2432e123ufeu645",
    content: "This is my comment and I have nothing much to say really.",
    vote: "DISLIKE",
    title: "Title to my comment",
  },
  {
    id: "12efeqr2432e123ufeu645",
    content: "This is my comment and I have nothing much to say really.",
    vote: "LIKE",
    title: "Title to my comment",
  },
];

export const JobViewPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState<any>({});
  const [freelancer, setFreelancer] = useState<any>({});

  useEffect(() => {
    const getJobs = async () => {
      const fetchJobs = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/job/id/${id}`
      );

      const job = await fetchJobs.json();

      setJob(job);
    };

    const getAssigneeAttest = async () => {
      const fetchAssignee = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/job/freelancer/${id}`
      );
      const assignee = await fetchAssignee.json();
      setFreelancer(assignee);
      console.log(assignee);
    };
    getAssigneeAttest();
    getJobs();
  }, []);



  const openEas = (id: string) => {
    window.location.href = `https://sepolia.easscan.org/attestation/view/${id}`;
  };

  return (
    <div className="job-view-wrap">
      <div className="d-flex">
        <div className="job-view-title">{job.title}</div>
        <div className="eas-ic" onClick={() => openEas(job.id)}>
          <img
            className="eas-ico"
            src="https://pbs.twimg.com/profile_images/1593335725751083008/0XMyDyLq_400x400.png"
          />
        </div>
      </div>
      <div className="tags-list" style={{ marginTop: "40px" }}>
        <div className="job-view-tag">{job.category}</div>
        <div className="job-view-tag">
          {moment(job.deadline).format("dddd, MMMM Do, YYYY h:mm A")}
        </div>
        <div className="job-view-tag">
          <div className="d-flex">
            <span className="material-symbols-outlined">new_releases</span>
            <div style={{ marginLeft: "10px" }}>Funds staked</div>
          </div>
        </div>
        <div className="job-view-tag d-flex">
          {job.price} <img src={ethicon} height="20px" width="20px" />{" "}
        </div>
      </div>

      <div className="job-view-description">{job.description}</div>

      <div className="assignee-wrap">
        <h1 className="comm-title">Freelancer</h1>
        <div className="freelancer">{freelancer.description}</div>
      </div>

      <div className="comments">
        <h1 className="comm-title">Comments</h1>
        <div>
          {comments.map((comment, idx) => (
            <div className="comment-card" key={idx}>
              <div className="comment-top">
                <div className="comment-title">{comment.title}</div>
                <div className="emote">
                  {comment.vote === "LIKE" ? (
                    <span className="material-symbols-outlined">thumb_up</span>
                  ) : (
                    <span className="material-symbols-outlined">
                      thumb_down
                    </span>
                  )}
                </div>
              </div>

              <div className="comment-content">{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
