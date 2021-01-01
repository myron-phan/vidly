import React, { Component } from "react";

//Input: true or false on whether or not the component is liked
//Output: it will raise an onClick event, basically its only job is to toggle the liked state
//basically we feed what is happening on the DOM component (movies.jsx or whatever parent component) into the child component so the child has conditions to operate to know what to do
class Like extends Component {
	render() {
		let classes = "fa fa-heart";
		if (!this.props.liked) classes += "-o";
		return (
			<i
				onClick={this.props.onLike}
				style={{ cursor: "pointer" }}
				className={classes}
				aria-hidden="true"
			></i>
		);
	}
}

export default Like;
