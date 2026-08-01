import arepasImage from "../../../assets/recipes/arepa_with_queso.jpg";
import cachapasImage from "../../../assets/recipes/cachapas.jpg";
import SueroCaraotaImage from "../../../assets/recipes/suero_caraota.jpg";
import quesosImage from "../../../assets/recipes/bandeja_de_quesos.jpg";

export const recipes = [
  {
    id: "arepas-con-queso",
    name: "Arepas con queso Mr. Emilio",
    image: arepasImage,
    path: "/recipes/arepas-con-queso",
  },
  {
    id: "cachapas-venezolanas",
    name: "Cachapas Venezolanas",
    image: cachapasImage,
    path: "/recipes/cachapas-venezolanas",
  },
  {
    id: "tequenos-perfectos",
    name: "Criollito con suero y caraotas",
    image: SueroCaraotaImage,
    path: "/recipes/caraotas-suero",
  },
  {
    id: "quesos-para-compartir",
    name: "Bandeja de quesos Mr Emilio",
    image: quesosImage,
    path: "/recipes/quesos-para-compartir",
  },
];
