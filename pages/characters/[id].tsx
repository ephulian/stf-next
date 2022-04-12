import Image from 'next/image';
import React from 'react';
import { Character } from '../../types';
import imageLoader from '../../imageLoader';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const res = await await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);

	const character = await res.json();

	return {
		props: {
			character,
		},
	};
};

export default CharacterPage;
