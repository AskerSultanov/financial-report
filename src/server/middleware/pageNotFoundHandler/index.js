import { join } from "node:path";

var pageNotFoundHandler = async (req, res) => res.sendFile(join(import.meta.dirname, "../../../public/html/notFound.html"));

export default pageNotFoundHandler;
