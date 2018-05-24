import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<h1>Home do site!</h1>
		<Link to="/admin">ir para o painel</Link>
	</div>
)

export default Home
