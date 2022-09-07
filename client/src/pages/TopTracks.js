import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getTopTracks } from "../spotify";
import { SectionWrapper, TrackList, TimeRangeButtons } from "../components";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopTracks = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topTracks && (
        <SectionWrapper title="Top Tracks" breadcrumb="true">
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <TrackList tracks={topTracks.items} />
        </SectionWrapper>
      )}
    </main>
  );
};

export default TopTracks;
