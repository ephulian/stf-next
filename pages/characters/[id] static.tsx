import Image from 'next/image';
import React from 'react';
import { Character, GetCharacterResults } from '../../types';
import imageLoader from '../../imageLoader';

function CharacterPage({ character }: { character: Character }) {
	return (
		<div>
			<h1>{character.name}</h1>

			<Image
				src={character.image}
				alt={character.name}
				width='200px'
				height='200px'
				loader={imageLoader}
				unoptimized
			/>
		</div>
	);
}

export async function getStaticPaths() {
	const res = await fetch('https://rickandmortyapi.com/api/character');
	const { results }: GetCharacterResults = await res.json();

	const ids = results.map((result) => result.id);
	const paths = ids.map((id) => ({ params: { id: id.toString() } }));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const res = await await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);

	const character = await res.json();

	return {
		props: {
			character,
		},
	};
}

export default CharacterPage;
