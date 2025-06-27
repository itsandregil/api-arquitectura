import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";

/**
 * @swagger
 * components:
 *  schemas:
 *    AgifyResponse:
 *      type: object
 *      properties:
 *        count:
 *          type: integer
 *          format: int64
 *          example: 22434
 *        name:
 *          type: string
 *          example: Arthur
 *        age:
 *          type: integer
 *          format: int64
 *          example: 52
 */
const openApiOptions: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Arquitectura de Software",
      version: "1.0.0",
      description:
        "API con fines educativos para la clase Arquitectura de Software",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Local server" },
    ],
  },
  apis: ["*/routes/*.ts", "*/core/swagger.ts"],
};

export const apiSpec = swaggerJSDoc(openApiOptions);
