import { useEffect, useState } from "react";
import "./jobs-list.css";
import moment from "moment";

export const JobsListPage = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [gigs, setGigs] = useState<any[]>([]);

  useEffect(() => {
    const fetchGigs = async () => {
      const getGigs = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job/all-jobs`);
      const allGigs = await getGigs.json();

      setGigs([...allGigs]);
    }

    fetchGigs();
  }, [])

  const filterByType = (gig: any) => {
    if (typeFilter === "" || typeFilter.includes(gig.category)) {
      return true;
    }

    return false;
  };

  const filterByTitle = (gig: any) => {
    if(searchTitle === "" || gig.title.includes(searchTitle)){
        return true;
    }

    return false;
  }

  return (
    <div className="jobs-list-wrapper">
      <div className="jobs-filter">
        <div className="filter-title">Filter</div>

        <div className="filter-group">
          <div className="group-label">Category</div>
          <select
            className="login-input type-select"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value={"Blockchain"}>Blockchain</option>
            <option value={"Machine learning"}>Machine learning</option>
            <option value={"Cybersecurity"}>Cybersecurity</option>
          </select>
        </div>

        <div className="filter-group">
          <div className="group-label">Rating</div>
          <select
            className="login-input type-select"
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value={"4"}>4+</option>
            <option value={"3"}>3+</option>
            <option value={"2"}>2+</option>
            <option value={"2"}>1+</option>
          </select>
        </div>
      </div>

      <div className="right-side">
        <div className="title-search">
          <div className="input-wrapper">
            <div className="icon-holder">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="search-input"
              placeholder="Search..."
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="jobs-list">
          {gigs
            .filter((gig) => filterByType(gig))
            .filter((gig) => filterByTitle(gig))
            .map((gig, idx) => (
              <div className="job-card" key={idx}>
                <div className="card-top">
                  <div className="job-title">{gig.title}</div>
                  <div className="apply-btn">Apply</div>
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
    </div>
  );
};
