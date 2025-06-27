import { Router } from "express";
import { getNameAge } from "../controllers/name.controller";

const router = Router();

/**
 * @swagger
 * /names/{name}:
 *  get:
 *    summary: Get your age based on your name
 *    description: Return your age and name
 *    tags: [Names]
 *    parameters:
 *      - in: path
 *        required: true
 *        name: name
 *        description: The name you want to know its age
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Data with the name and the age
 *        content:
 *          application/json:
 *            schema:
 *               $ref: "#/components/schemas/AgifyResponse"
 */
router.get("/names/:name", getNameAge);

export default router;
