var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/stylist", async (req, res) => {
    try {
      const { occasion, outfitStyle, outfitColor, preferences } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured in the workspace secrets. Please add it in Settings > Secrets."
        });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const systemInstruction = `You are "Vimkant Stylist AI", an exceptionally warm, professional, and elegant jewelry consultant for Vimkant (vimkant.com). 
Vimkant offers beautiful, stylish, and affordable artificial jewelry with reliable express shipping in Delhi-NCR and nationwide across India. 
Our catalog includes Royal Kundan Choker Sets, Peacock Jhumkas, Temple Kada Bangles, Solitaire Rings, Contemporary Rose Gold Chokers, Pearl Passas, Polki Chandbalis, Multi-Layer Jadau Malas, Kundan Hathphools, Platinum-plated American Diamond sets, and Pearl Maang Tikkas.

Your objective is to provide professional, personalized styling advice based on the user's input:
- Occasion (e.g., Wedding, Cocktail Party, Casual, Festival, Reception)
- Outfit Style (e.g., Saree, Lehenga, Gown, Kurti, Indo-western)
- Outfit Color (e.g., Red, Pastel Pink, Emerald Green, Black, Royal Blue, Gold)
- Styling Preferences (e.g., Minimalist, statement pieces, classic gold, modern platinum, pearl accents)

Provide encouraging advice. Explain *how* they can carry the suggested jewellery beautifully (e.g. "We recommend a neat updo hairstyle to highlight the exquisite crescent shapes of the Chandbalis", "Let the Royal Kundan Choker frame your deep sweetheart neckline beautifully").
Give advice that feels like an upscale boutique experience. Do not reference any internal file paths.

IMPORTANT: You must return your response in a clear JSON object with two fields:
1. "stylistAdvice": string (Detailed styling guidance in elegant Markdown. Use bullet points for steps or tips)
2. "recommendedProductIds": string[] (Select 1 to 3 best matching product IDs from this exact list:
   - "padmavati-kundan-set"
   - "mayura-peacock-jhumka"
   - "vrinda-antique-kada"
   - "devi-solitaire-ring"
   - "aura-rose-gold-choker"
   - "chandni-pearl-passa"
   - "mira-polki-chandbalis"
   - "royal-jadau-mala"
   - "gauri-kundan-hathphool"
   - "tanisha-ad-necklace"
   - "riya-velvet-kadas"
   - "sona-pearl-tikka"
)
Ensure you return exactly this JSON format.`;
      const prompt = `Styling Session Details:
- Occasion: ${occasion || "Not specified"}
- Outfit Style/Silhouette: ${outfitStyle || "Not specified"}
- Outfit Color: ${outfitColor || "Not specified"}
- Special Preferences: ${preferences || "No specific preferences"}

Analyze these inputs and write the most elegant styling advice. Recommended jewelry should only contain IDs from the permitted list.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              stylistAdvice: {
                type: import_genai.Type.STRING,
                description: "The Markdown-formatted styling advice from the consultant."
              },
              recommendedProductIds: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "1 to 3 matching product IDs from the allowed list."
              }
            },
            required: ["stylistAdvice", "recommendedProductIds"]
          }
        }
      });
      const responseText = response?.text || "{}";
      const resultData = JSON.parse(responseText.trim());
      res.json(resultData);
    } catch (error) {
      console.error("AI Stylist API error:", error);
      res.status(500).json({
        error: error.message || "An error occurred while generating your jewelry recommendations."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vimkant full-stack server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
