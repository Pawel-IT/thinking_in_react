import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import * as Icon from "react-bootstrap-icons";

export default class DogsList extends React.Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
		this.handleBreedChange = this.handleBreedChange.bind(this);
		this.state = {
			message: [],
			dogURL: "https://dog.ceo/api/breeds/image/random",
			dogBreed: "",
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
		var CurrentURL = `https://dog.ceo/api/breed/${e}/images/random`;
		this.setState({ dogBreed: e });
		this.setState({ dogURL: CurrentURL });
		console.log(e);
		console.log(this.state);
		this.getRandomImage(e);
	}

	getRandomImage(breed) {
		var breedURL = this.state.dogURL;
		if (breed) {
			breedURL = `https://dog.ceo/api/breed/${breed}/images/random`;
		}

		axios.get(breedURL).then((response) => {
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
		console.log("Breed: " + this.state.dogBreed);
		return (
			<div>
				<nav className="navbar navbar-dark bg-dark">
					<span className="navbar-brand ms-3">Doggies!</span>
					<ShowButton
						onButtonClick={this.handleRefreshClick}
						btnText="Next"
						btnIcon=<Icon.ArrowBarRight />
						btnClass="btn btn-success me-2"
					/>
				</nav>

				<div className="container-fluid">
					<div className="">
						<ShowImage
							image={this.state.message}
							breed={this.state.dogBreed}
						/>
					</div>
					<div class="alert alert-success" role="alert">
						Click next in the top right of the screen to cycle
						random dogs. Or select a breed below and next will only
						cycle through those breeds.
					</div>
					<p className="lead">
						This is a sample app written by Pawel K using ReactJS to
						brush up on my javascript skills.{" "}
						<a
							href="https://github.com/Pawel-IT/thinking_in_react"
							target="_newWin"
						>
							Source code can be found here
						</a>
						.
					</p>
					<div className="btn-group-vertical btn-group-sm">
						<BreedList
							onButtonClick={this.handleBreedChange}
							currentBreed={this.state.dogBreed}
						/>
					</div>
				</div>
			</div>
		);
	}
}

//Will send info to parent using the this.handleChange function
//that we mapped when calling this Button
class ShowButton extends React.Component {
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
		console.log(this.props.currentBreed);
		const keys = Object.keys(this.state.breeds);
		var buttonClass = "btn btn-outline-primary";
		return keys.map((element, i) => {
			if (element === this.props.currentBreed) {
				buttonClass = "btn btn-primary active";
			} else {
				buttonClass = "btn btn-outline-primary";
			}
			return (
				<button
					className={buttonClass}
					onClick={(e) => this.handleChange(element)}
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
				<img className="img-fluid mt-1" src={this.props.image} />
				<figcaption className="figure-caption text-capitalize">
					<h2>{this.props.breed}</h2>
				</figcaption>
			</figure>
		);
	}
}
