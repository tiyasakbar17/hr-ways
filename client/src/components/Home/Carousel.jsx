import React from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

function Carousel({ thumbnail }) {
	const history = useHistory();

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		autoplay: true,
	};

	return (
		<Slider {...settings}>
			{thumbnail.map(({ image, id, title }) => (
				<div key={id} style={{ width: "50%", position: "relative" }} onClick={() => history.push(`/post/${id}`)} className="pl-2 slideBox">
					<img src={image} alt="carousel" className="image slider" />
					<div style={{ padding: "0.2%", width: "10%", maxHeight: "20%", position: "fixed", top: "75%", bottom: "5%", color: "white", marginLeft: "10px", background: "rgba(0, 0, 0, 0.4)", borderRadius: 10, textOverflow: "ellipsis", overflow: "hidden" }}>
						<p>{title}</p>
					</div>
				</div>
			))}
		</Slider>
	);
}

export default Carousel;

// <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ width: "100%" }}>
// 	<div className="carousel-inner" style={{ width: "100%" }}>
// 		<div className="carousel-item active" style={{ width: "100%" }}>
// 			<img src={thumbnail[0].img} className="image" alt="..." />
// 		</div>
// 	</div>
// 	<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
// 		<span className="carousel-control-prev-icon" aria-hidden="true"></span>
// 		<span className="sr-only">Previous</span>
// 	</a>
// 	<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
// 		<span className="carousel-control-next-icon" aria-hidden="true"></span>
// 		<span className="sr-only">Next</span>
// 	</a>
// </div>
