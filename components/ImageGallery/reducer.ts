import { Reducer } from 'react';

export const NEXT_IMAGE = 'imageGallery/next' as const;
export const PREVIOUS_IMAGE = 'imageGallery/previous' as const;

export const nextImage = (): { type: typeof NEXT_IMAGE } => ({
  type: NEXT_IMAGE,
});

export const previousImage = (): { type: typeof PREVIOUS_IMAGE } => ({
  type: PREVIOUS_IMAGE,
});

type Action = ReturnType<typeof nextImage | typeof previousImage>;
type State = {direction: 'none' | 'next' | 'previous'; elements: VisualElement[]}

export const getDefaultState = (elements: VisualElement[]): State => ({
  elements,
  direction: 'none',
});

export const imageGalleryReducer: Reducer<State, Action> = (state = getDefaultState([]), action) => {
  switch (action.type) {
    case NEXT_IMAGE:
      return {
        elements: calculateNextImages(state.elements),
        direction: 'next',
      };
    case PREVIOUS_IMAGE:
      return {
        elements: calculatePreviousImages(state.elements),
        direction: 'previous',
      };
    default:
      return state;
  }
}

function calculateNextImages(elements: VisualElement[]) {
  return [...elements.slice(1), elements[0]];
}

function calculatePreviousImages(elements: VisualElement[]) {
  return [elements[elements.length - 1], ...elements.slice(0, elements.length - 1)];
}

export type VisualElement = {
  src: string;
  alt?: string;
  type: 'image' | 'video'
}
