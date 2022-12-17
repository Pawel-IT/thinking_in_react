import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as Icon from "react-bootstrap-icons";

const baseURL = "https://dog.ceo/api/breeds/image/random";

export default class DogsList extends React.Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
		this.handleBreedChange = this.handleBreedChange.bind(this);
		this.state = {
			message: [],
			dogURL: "https://dog.ceo/api/breeds/image/random",
			//https://dog.ceo/api/breed/hound/images/random
		};
	}

	//This is function called from Button Component
	//e has return value from child.
	handleRefreshClick(e) {
		axios.get(this.state.dogURL).then((response) => {
			//setPosts(response.data);
			this.setState({ message: response.data.message });
		});
	}

	handleBreedChange(e) {
		//this.setState({ dogURL: e });
		console.log(e);
		this.setState({ dogURL: e });
	}

	getRandomImage() {
		axios.get(this.state.dogURL).then((response) => {
			//setPosts(response.data);
			this.setState({ message: response.data.message });
		});
	}

	componentDidMount() {
		// make fetch request
		this.getRandomImage();
	}

	componentWillUnmount() {
		// make fetch request
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark">
					<span className="navbar-brand ms-3">Doggies!</span>
					<Button
						onButtonClick={this.handleRefreshClick}
						btnText="Next"
						btnIcon=<Icon.ArrowBarRight />
						btnClass="btn btn-success me-2"
					/>
				</nav>
				<div id="hi" className="container-fluid">
					<ShowImage image={this.state.message} />
					<BreedList
						onButtonClick={this.handleBreedChange}
						currentImage={this.state.dogURL}
					/>
				</div>
			</div>
		);
	}
}

//Will send info to parent using the this.handleChange function
//that we mapped when calling this Button
class Button extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.props.onButtonClick("Data back to Parent Yay!");
	}
	render() {
		return (
			<button className={this.props.btnClass} onClick={this.handleChange}>
				{this.props.btnText} {this.props.btnIcon}
			</button>
		);
	}
}

class BreedList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { breeds: {} };
		this.handleChange = this.handleChange.bind(this);
	}
	getListofBreeds() {
		const breedURL = "https://dog.ceo/api/breeds/list/all";
		axios.get(breedURL).then((response) => {
			//setPosts(response.data);
			this.setState({ breeds: response.data.message });
			console.log("1 data");
			console.log(response.data.message);
		});
	}
	handleChange(e) {
		this.props.onButtonClick(e);
	}
	componentDidMount() {
		// make fetch request
		this.getListofBreeds();
	}

	componentWillUnmount() {
		// make fetch request
	}

	render() {
		console.log("222----------------------------------");
		console.log(this.state.breeds);

		const keys = Object.keys(this.state.breeds);
		console.log(keys);
		return keys.map((element, i) => {
			console.log(this.props.CurrentImage);

			return (
				<button
					className="btn btn-primary m-2"
					onClick={(e) =>
						this.handleChange(
							`https://dog.ceo/api/breed/${element}/images/random`
						)
					}
					key={element}
				>
					{element}
				</button>
			);
		});
	}
}

class ShowImage extends React.Component {
	render() {
		return (
			<figure className="figure">
				<img
					className="img-fluid rounded mt-1"
					src={this.props.image}
				/>
			</figure>
		);
	}
}

class ShowButton extends React.Component {
	render() {
		return (
			<img className="img-fluid rounded mt-1" src={this.props.image} />
		);
	}
}
