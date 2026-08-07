// Config editable de reels — el cliente todavía no eligió los videos
// reales, así que todo acá es placeholder. Para publicar un reel real:
// 1) actualizar `videoUrl` con el link de Instagram, 2) reemplazar
// `thumbnail` por una imagen real en /public/placeholders (o donde se
// prefiera alojarla).
export type Reel = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

export const REELS_CONTENT = {
  tag: "Mirá cómo funciona",
  heading: "Así es ColVending en acción",
  items: [
    {
      id: "instalacion",
      title: "Así traemos la máquina",
      thumbnail: "/placeholders/reel-1.jpg",
      videoUrl: "", // TODO: reemplazar por URL real del reel
    },
    {
      id: "funcionamiento",
      title: "Así funciona la máquina",
      thumbnail: "/placeholders/reel-2.jpg",
      videoUrl: "", // TODO: reemplazar por URL real del reel
    },
    {
      id: "entrega",
      title: "Cuánto tarda en entregar un producto",
      thumbnail: "/placeholders/reel-3.jpg",
      videoUrl: "", // TODO: reemplazar por URL real del reel
    },
  ] satisfies Reel[],
} as const;

// Reels adicionales que se muestran dentro de "Caso real" (Punto Ya).
export const CASO_REAL_REELS = [
  {
    id: "reestock",
    title: "Cómo reestockeamos la máquina",
    thumbnail: "/placeholders/reel-4.jpg",
    videoUrl: "", // TODO: reemplazar por URL real del reel
  },
  {
    id: "uso-local",
    title: "Así se usa la máquina en el local",
    thumbnail: "/placeholders/reel-5.jpg",
    videoUrl: "", // TODO: reemplazar por URL real del reel
  },
  {
    id: "dia-a-dia",
    title: "Así es un día en Punto Ya",
    thumbnail: "/placeholders/reel-6.jpg",
    videoUrl: "", // TODO: reemplazar por URL real del reel
  },
] satisfies Reel[];
