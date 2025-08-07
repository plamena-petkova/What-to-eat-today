import React from 'react';
import Navbar from './Navbar';
import ResultCard from './ResultCard';
import RecipeSection from './RecipeSection';
import AnimatedLinkButton from './AnimatedLinkButton';
import { Recipe } from '../types/interfaces';

type Props ={
    recipe:Recipe
}

const ResultPageComponent = ({recipe}:Props) => {
     const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(recipe!.name)}+recipe`;
    return (
        <>
            <Navbar />
      <div className="mt-20">
        <div className="flex justify-center m-3 p-3">
          <ResultCard food={recipe!.name} />
        </div>

        <div className="p-6 max-w-md mx-auto">
          <RecipeSection recipe={recipe!} />

          <AnimatedLinkButton href={searchUrl} newTab>
            Search for full recipe
          </AnimatedLinkButton>
          <AnimatedLinkButton href='/spin' newTab={false}>
            Spin again
          </AnimatedLinkButton>
        </div>
      </div>
        </>
    );
};

export default ResultPageComponent;