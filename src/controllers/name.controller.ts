import { NextFunction, Request, Response } from "express";
import config from "../core/config";
import { client } from "../core/redis";
import { AgifyResponse } from "../types";

const getNameAge = async (
  req: Request<{ name: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;

    // Get data from cache if already cached
    const cached = await client.get(`names:${name}`);

    if (cached) {
      res.status(200).json({ ...JSON.parse(cached) });
      return;
    }

    const response = await fetch(`https://api.agify.io?name=${name}`);

    if (!response.ok) {
      res.status(response.status).json({ messsage: response.statusText });
      return;
    }

    const data = (await response.json()) as AgifyResponse;

    // Cache the response data
    await client.setEx(
      `names:${name}`,
      config.cacheExpirationTime,
      JSON.stringify(data)
    );

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { getNameAge };
