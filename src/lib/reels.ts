// Config editable de reels. `thumbnail` apunta a la miniatura real de cada
// reel (extraída del og:image de su post de Instagram), guardada en
// /public/placeholders/reel-N.jpg.
export type Reel = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
};

export const REELS_CONTENT = {
  tag: "Mirá cómo funciona",
  heading: "Así es ColVending en acción",
  lead: "En nuestras redes mostramos el día a día de las máquinas ColVending. Estos son algunos de esos videos, para que veas cómo funciona todo en la práctica.",
  items: [
    {
      id: "instalacion",
      title: "Cómo comprar en una máquina expendedora inteligente",
      thumbnail: "/placeholders/reel-1.jpg",
      videoUrl: "https://www.instagram.com/p/DUziQxMjavG/",
    },
    {
      id: "funcionamiento",
      title: "No te preocupes por el pago con billete falso",
      thumbnail: "/placeholders/reel-2.jpg",
      videoUrl: "https://www.instagram.com/colvending_/reel/DU2BELCkSAb/",
    },
    {
      id: "entrega",
      title: "Cómo apagar y prender una máquina expendedora",
      thumbnail: "/placeholders/reel-3.jpg",
      videoUrl: "https://www.instagram.com/p/DTzIDV4DQRo/",
    },
  ] satisfies Reel[],
} as const;

// Reels adicionales que se muestran dentro de "Caso real" (Punto Ya).
export const CASO_REAL_REELS = [
  {
    id: "reestock",
    title: "Cómo controlamos el stock",
    thumbnail: "/placeholders/reel-4.jpg",
    videoUrl: "https://www.instagram.com/p/Da4Ii23snES/",
  },
  {
    id: "uso-local",
    title: "Facilidad de compra",
    thumbnail: "/placeholders/reel-5.jpg",
    videoUrl: "https://www.instagram.com/p/DZlLm1pqthZ/",
  },
  {
    id: "dia-a-dia",
    title: "Cómo actuamos contra el vandalismo",
    thumbnail: "/placeholders/reel-6.jpg",
    videoUrl: "https://www.instagram.com/p/DZDJEDLx-CQ/",
  },
] satisfies Reel[];
