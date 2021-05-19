import React from "react";
import { useHistory } from "react-router-dom";

function Card({ data }) {
	const history = useHistory();

	return (
		<div className="card d-flex flex-row mb-1 pointer" style={{ width: "100%", maxHeight: "150px", overflow: "hidden", textOverflow: "ellipsis", position: "relative", padding: "0.3%" }} onClick={() => history.push(`/post/${data.id}`)}>
			<div style={{ width: "30%", maxHeight: "150px", overflow: "hidden col-2" }}>
				<img src={data.image} alt="thumbnail" style={{ borderRadius: 3 }} className="image" />
			</div>
			<div className="d-flex flex-column" style={{ width: "70%", maxHeight: "200px", position: "relative", paddingLeft: "1%" }}>
				<div style={{ width: "100%", height: "85%", overflow: "hidden", textOverflow: "ellipsis" }}>
					<h6 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{data.title}</h6>
				</div>
				<div style={{ fontSize: "12px", width: "100%", height: "10%" }} className="text-muted">
					<span>
						By. {data.author.name}, {new Date(data.createdAt).toDateString()}
					</span>
				</div>
			</div>
		</div>
	);
}

export default Card;
