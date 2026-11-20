import { siteConfig } from "@/config/site";
import OpengraphImage from "./opengraph-image";

// Mesma arte da imagem Open Graph, usada no card do X/Twitter
export const alt = `${siteConfig.name} — criação de sites profissionais para todo o Brasil`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
