import { v4 as uuidv4 } from "uuid";

export class UuidV4Adapter {
    private constructor() {} // Evita que la clase sea instanciada
  
    /**
     * Genera un nuevo UUID v4.
     * @returns {string} El UUID generado.
     */
    static generate(): string {
      return uuidv4();
    }
  }