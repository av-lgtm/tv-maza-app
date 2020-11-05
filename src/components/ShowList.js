import React from "react";

const ShowList = (props) => {
    const {show} = props;
    const poster = show?.image?.medium || '';

    const callEpisodeFunction = (show) => {
        props.getShowEpisodes(show);
    }

    return (
        <div className="show flex-center">
            <div className="show-image">
            <img
                width="200"
                alt={`The show titled: ${show?.name}`}
                src={poster}
            />
            </div>
            <div className="show-content">
                <h2>{show?.name}</h2>
                <p dangerouslySetInnerHTML={ {__html: show?.summary} } />
                <button className="show-episode-btn border-radius" onClick={() => callEpisodeFunction(show)}>Show Episodes</button>
            </div>
        </div>     
    );
  };

export default ShowList;