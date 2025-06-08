import { NextFunction, Request, Response } from "express";
import config from "../core/config";
import { client } from "../core/redis";

const getNameAge = async (
  req: Request<any, any, any, { name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    // Get data from cache if already cached
    const cached = await client.get(name);

    if (cached) {
      res.status(200).json({ data: JSON.parse(cached) });
      return;
    }

    const response = await fetch(`https://api.agify.io?name=${name}`);

    if (!response.ok) {
      res.status(response.status).json({ messsage: response.statusText });
    }

    const data = await response.json();

    // Cache the response data
    await client.setEx(name, config.cacheExpirationTime, JSON.stringify(data));

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export { getNameAge };
