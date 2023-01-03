import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *   tags:
 *   - HealthCheck
 *   description: Get a 200 response if the server is up and running
 *   responses:
 *    200:
 *      description: App is up and running
 */
router.get('/', (req: Request, res: Response) => res.sendStatus(200));

export default router;
