const images = [
  {
    src: 'vista_salon.jpg',
    alt: 'Mesas listas para comenzar la fiesta. Al fondo puede verse la mesa con dulces y la mesa de buffet.',
  },
  {
    src: 'mesa_de_dulces.jpg',
    alt: 'Mesa con dulces y bocadillos para los invitados.',
  },
  {
    src: 'mesa_de_buffet.jpg',
    alt: 'La mesa con buffet ofrece diferentes opciones de comida para los invitados.',
  },
  {
    src: 'vista_de_mesa.jpg',
    alt: 'Mesa redonda para 10 personas, con bonito centro de mesa.',
  },
  {
    src: 'centro_de_mesa.jpg',
    alt: 'Mesa redonda para 10 personas, con bonito centro de mesa.',
  },
] as const;

export const DESKTOP_IMAGES = images.map((image) => ({
  ...image,
  src: `/desktop/${image.src}`,
}));

export const MOBILE_IMAGES = images.map((image) => ({
  ...image,
  src: `/mobile/${image.src}`,
}));
