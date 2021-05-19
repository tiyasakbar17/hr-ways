import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bookmark } from "../redux/actions/Auth";
import { deletePost, getPost } from "../redux/actions/Posts";

const DetailPost = ({ getPost, Posts: { post, loadingPost, posts }, Auth: { userData, loading, isLogin }, bookmark, deletePost }) => {
	const history = useHistory();
	const params = useParams();
	const current = posts.findIndex((element) => element.id === parseInt(params.id));

	useEffect(() => {
		getPost(params.id);
	}, [params.id]);

	if (loadingPost || loading) {
		return <div></div>;
	}

	const nextArticle = () => {
		history.push(`/post/${posts[current + 1].id}`);
	};
	const bookmarked = isLogin ? post.bookmarks.findIndex((mark) => mark.author_id === userData.id) : null;
	const saveHandler = () => {
		bookmark(params.id);
	};
	const deleteHandler = () => {
		deletePost(params.id).then(() => {
			history.push("/");
		});
	};

	return (
		<div className="container mb-5">
			<div style={{ borderBottom: "1px grey solid" }} className="mb-3">
				<h3 className="mt-4 text-primary">
					{params.id}. {post.title}
				</h3>
				<span className="text-muted" style={{ fontSize: "13px" }}>
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<div className="d-flex flex-row-reverse mb-1">
				{isLogin ? (
					userData.id === post.author.id ? (
						<button className="pointer btn btn-danger ml-1" onClick={deleteHandler}>
							Delete post
						</button>
					) : null
				) : null}
				{isLogin ? (
					!bookmarked ? (
						<button className="pointer btn btn-danger" onClick={saveHandler}>
							un-save
						</button>
					) : (
						// <i className="fa fa-bookmark-o"></i>
						<button className="pointer btn btn-success" onClick={saveHandler}>
							Save this post
						</button>
					)
				) : null}
			</div>
			<div style={{ width: "100%", height: "30%" }}>
				<img src={post.image} alt="images" className="image" />
			</div>
			<div className="text-muted d-flex justify-content-between" style={{ fontSize: "13px" }}>
				<span>Published by. {post.author.name}</span>
			</div>
			<div className="mt-3" style={{ borderTop: "1px solid grey" }}>
				<p style={{ textIndent: "6%", textAlign: "justify" }}>{post.body}</p>
			</div>
			<div className="d-flex flex-row justify-content-around">
				<button className="btn btn-success mr-1 flex-fill" onClick={() => history.push("/")}>
					home
				</button>
				{!posts[current + 1] ? null : (
					<button className="btn btn-primary ml-1 flex-fill" onClick={() => nextArticle()}>
						next article
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	Posts: state.Posts,
	Auth: state.Auth,
});

const mapDispatchToProps = { getPost, bookmark, deletePost };

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
