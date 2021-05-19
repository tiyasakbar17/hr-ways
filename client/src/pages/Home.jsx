import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../components/Home/Card";
import Carousel from "../components/Home/Carousel";
import { getPosts } from "../redux/actions/Posts";

const Home = ({ Posts: { posts }, getPosts }) => {
	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="container mb-5">
			<div className="showBox mb-4">
				<Carousel thumbnail={posts.slice(0, 4)} />
			</div>
			<div style={{ width: "100%", borderBottom: "1px gray solid" }} className="mt-5">
				<h1>News</h1>
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

const mapDispatchToProps = { getPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
