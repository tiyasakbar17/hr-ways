import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { addPost } from "../redux/actions/Posts";
import { useHistory } from "react-router-dom";

const AddPost = ({ addPost }) => {
	const history = useHistory();
	const initialValues = {
		title: "",
		article: "",
		image: null,
		tag: [],
	};

	const onSubmit = async (values) => {
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("image", values.image);
		formData.append("body", values.article);
		addPost(formData).then(() => {
			history.push("/");
		});
	};

	return (
		<div className="container mb-5">
			<h2 className="text-primary">Add New Post</h2>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({ values, handleChange, setFieldValue }) => {
					return (
						<Form>
							<div className="form-group">
								<label for="AddPostEmail">Title</label>
								<input type="title" className="form-control" name="title" placeholder="Post's Title" value={values.title} onChange={handleChange} />
							</div>
							<div className="form-group">
								<label for="AddPostText">Article</label>
								<textarea type="textarea" className="form-control" style={{ minHeight: "300px" }} name="article" id="AddPostText" value={values.article} onChange={handleChange} />
							</div>
							<div className="form-group">
								<label for="AddPostFile">Image</label>
								<input type="file" className="form-control" name="file" id="AddPostFile" accept="image/*" onChange={(e) => (e.target.files ? setFieldValue("image", e.target.files[0]) : null)} />
							</div>
							{values.image ? (
								<div style={{ width: "40%", overflow: "hidden" }}>
									<img className="image" src={URL.createObjectURL(values.image)}></img>
								</div>
							) : null}
							<button type="submit" className="btn btn-success mt-2">
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addPost };

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
