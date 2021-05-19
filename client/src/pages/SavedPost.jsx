import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSavedPosts } from "../redux/actions/Posts";
import Card from "../components/Home/Card";

const SavedPost = ({ Posts: { posts }, getSavedPosts }) => {
	useEffect(() => {
		getSavedPosts();
	}, []);

	if (!posts) {
		return (
			<div className="container">
				<h2 className="text-primary">no saved post</h2>
			</div>
		);
	}

	return (
		<div className="container mb-5">
			<div style={{ width: "100%", borderBottom: "1px gray solid" }} className="mt-5">
				<h1>Saved Posts</h1>
			</div>
			<div className="mt-2">
				{posts.map((item, i) => (
					<Card key={i} data={item} />
				))}
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	Posts: state.Posts,
});

const mapDispatchToProps = { getSavedPosts };

export default connect(mapStateToProps, mapDispatchToProps)(SavedPost);
