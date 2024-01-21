// TODO: Fix this 💩
// Just to ease out the development. I'm using a nasty workaround to load the pictures.
// This should totally be discarded by a better implementation. I'm just being lazy.
import { VisualElement } from '@components/ImageGallery/reducer';

const KNOWN_GALLERIES = {
  // kids_party: {
  //   picturesLength: 15,
  // },
  wedding: ['wedding_1.jpg', 'wedding_2.jpg', 'wedding_3.jpg', 'wedding_4.jpg', 'wedding_5.jpg', 'wedding_6.jpg', 'wedding_7.jpg', 'wedding_8.jpg', 'wedding_9.jpg', 'wedding_10.jpg', 'wedding_11.jpg', 'wedding_12.jpg', 'wedding_13.jpg'],
  premises: ['premises_0.mp4', 'premises_1.jpg', 'premises_2.jpg', 'premises_3.jpg', 'premises_4.jpg', 'premises_5.jpg'],
} as const;

export type Gallery = keyof typeof KNOWN_GALLERIES;
export type Target = 'desktop' | 'mobile';

export function loadGalleryImages(galleryName: Gallery, type: Target): VisualElement[] {
  return KNOWN_GALLERIES[galleryName]
    .map((name, index) => {
      return `${galleryName}/${type}/${name}`;
    })
    .map(src => ({
      src,
      alt: src,
      type: src.match(/.*\.jpg$/) ? 'image' : 'video'
    }));
}
