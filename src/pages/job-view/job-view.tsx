import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const JobViewPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState<any>({});

  useEffect(() => {
    const getJobs = async () => {
      const fetchJobs = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/job/id/${id}`
      );

      const job = await fetchJobs.json();

      setJob(job)
    };

    getJobs()
  }, []);

  return <div className="job-view-wrap"></div>;
};
