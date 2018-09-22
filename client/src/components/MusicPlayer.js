import React, { Component } from 'react';
import axios from 'axios';


class MusicPlayer extends Component{
	constructor(props) {
        super(props);

        this.state = {
            
        };
    }
	
	render(){
		return(
			<div>
				<iframe src="https://open.spotify.com/playlist/37i9dQZF1DWVu0D7Y8cYcs" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
			</div>
		);
	}
}

export default MusicPlayer;