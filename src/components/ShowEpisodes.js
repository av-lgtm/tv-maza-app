import React, { useState } from "react";

const ShowEpisodes = ( props ) => {
    const [selectedSeason, setSelectedSeason] = useState(props.selectedSeason);
    const DATE_OPTIONS = {  year: 'numeric', month: 'short', day: 'numeric' };
    const {episodesList, selectedShow} = props;
    const data = episodesList.reduce((result, currentValue) => {
        (result[currentValue['season']] = result[currentValue['season']] || []).push(
          currentValue
        );
        return result;
    }, {}); 

    console.log(data[1]);
    
    const handleOnChange = (season) => {
        setSelectedSeason(season);
    }

    return (
        <div className="show-details-content">
            <div className="show-information">
                <img src={selectedShow?.image?.medium} alt={selectedShow?.name}/>
                <h2>{selectedShow?.name}</h2>
                <p dangerouslySetInnerHTML={ {__html: selectedShow?.summary} } />
            </div>
            <div className="episodes">
                <select className="border-radius" name="select-season" onChange={(e) => handleOnChange(e.target.value)} value={selectedSeason}>  
                        { Object.entries(data).map((t,k) => <option key={k+1} value={k+1} >Season {k+1}</option>) }          
                    </select>
                    {data[selectedSeason] && data[selectedSeason].map((episode) => 
                        <div className="episode-list" key={episode.id}>
                            <span className="episode-no border-radius">{episode.number}</span>
                            <div className="episode-title">
                                <h3>{episode.name}</h3>
                                <p>{(new Date(episode.airdate)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
  };

export default ShowEpisodes;